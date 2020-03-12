import { sortBy } from 'fp-ts/lib/Array'
import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'
import { isSE } from '@strider/utils-ts'

interface Person {
	name: string
	age: number
}

const byName = ord.contramap (ordString, (p: Person) => p.name)
const byAge = ord.contramap (ordNumber, (p: Person) => p.age)

const sortByNameByAge = sortBy ([byName, byAge])

const persons: Person[] = [
	{ name: 'a', age: 1 },
	{ name: 'b', age: 3 },
	{ name: 'c', age: 2 },
	{ name: 'b', age: 2 }
]

it ('should sort persons', async () => {
	expect.assertions (1)
	const act = sortByNameByAge (persons)
	const exp = [
		{ name: 'a', age: 1 },
		{ name: 'b', age: 2 },
		{ name: 'b', age: 3 },
		{ name: 'c', age: 2 }
	]
	isSE (act, exp)
})

