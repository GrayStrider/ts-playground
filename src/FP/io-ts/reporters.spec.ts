import * as t from 'io-ts'
import { reporter } from 'io-ts-reporters'
import { pipe } from 'fp-ts/lib/pipeable'
import { isSE } from '@strider/utils-ts'

const Gender = t.union ([
	t.literal ('Male'),
	t.literal ('Female')
])

const Person = t.interface ({
	name: t.string,
	age: t.number,
	gender: Gender,
	// children: t.array(t.recursion('Person', Person)),
	children: t.array (
		t.interface ({
			gender: Gender
		})
	)
})

type IPerson = t.TypeOf<typeof Person>;

const logAndReport = (value: t.Validation<{}>) => {
	console.log ({
		value,
		reporterResult: reporter (value)
	})
}

const person1: IPerson = {
	name: 'Giulio',
	age: 43,
	gender: 'Male',
	children: [{ gender: 'Female' }]
}

it ('should return right without errors', async () => {
	expect.assertions (2)
	const exp = {
		'age': 43,
		'children': [
			{
				'gender': 'Female'
			}
		],
		'gender': 'Male',
		'name': 'Giulio'
	}
	const act = pipe (person1, Person.decode)
	expect (act).toEqualRight (exp)
	isSE (reporter (act), [])
})


it ('should return left', async () => {
	expect.assertions (2)
	const person2: {} = {
		name: 'Giulio',
		children: [{ gender: 'Whatever' }]
	}
	const act = pipe (person2, Person.decode)
	expect (act).toBeLeft ()
	
	const exp = [
		'Expecting number at age but instead got: undefined.',
		'Expecting "Male" at gender.0 but instead got: undefined.',
		'Expecting "Female" at gender.1 but instead got: undefined.',
		'Expecting "Male" at children.0.gender.0 but instead got: "Whatever".',
		'Expecting "Female" at children.0.gender.1 but instead got: "Whatever".'
	]
	isSE (reporter (act), exp)
})
const NumberGroups = t.array (t.array (t.number))


it ('should decode numbers', async () => {
	expect.assertions (2)
	const act1 = NumberGroups.decode ({})
	const act2 = NumberGroups.decode ([[{}]])
	const exp1 = ['Expecting Array<Array<number>> but instead got: {}.']
	const exp2 = ['Expecting number at 0.0 but instead got: {}.']
	isSE (reporter (act1), exp1)
	isSE (reporter (act2), exp2)
})
