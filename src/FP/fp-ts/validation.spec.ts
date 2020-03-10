import { Either, left, right, chain, getValidation, mapLeft, map } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { getSemigroup, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { sequenceT } from 'fp-ts/lib/Apply'

const minLength = (s: string): Either<string, string> =>
	s.length >= 6 ? right (s) : left ('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
	/[A-Z]/g.test (s) ? right (s) : left ('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
	/[0-9]/g.test (s) ? right (s) : left ('at least one number')


const validatePassword = (s: string): Either<string, string> =>
	pipe (
		minLength (s),
		chain (oneCapital),
		chain (oneNumber),
	)

/*
 Because we are using Either the checks are fail-fast. That is,
 any failed check shortcircuits subsequent checks so we will only ever get one error.
 */

it ('should validate password', async () => {
	expect.assertions (3)
	expect (validatePassword ('ab'))
		.toEqualLeft ('at least 6 characters')
	expect (validatePassword ('abcdef'))
		.toEqualLeft ('at least one capital letter')
	expect (validatePassword ('Abcdef'))
		.toEqualLeft ('at least one number')
})

/*
 However this could lead to a bad UX, it would be nice to
 have all of these errors be reported simultaneously.
 
 
 The Validation abstraction may help here.
 
 
 Validations are much like Either<E, A>, they represent a computation that might fail with an error of type E or succeed with a value of type A, but as opposed to the usual computations involving Either, they are able to collect multiple failures.
 
 In order to do that we must tell validations how to combine two values of type E.
 
 That's what Semigroup is all about: combining two values of the same type.
 
 For example we can pack the errors into a non empty array.
 
 The 'fp-ts/lib/Either' module provides a getValidation function that, given a semigroup, returns an alternative Applicative instance for Either
 */

const applicativeValidation = getValidation (getSemigroup<string> ())

/*
 However in order to use applicativeValidation we must first redefine all the rules so that they return a value of type
 Either<NonEmptyArray<string>, string>.
 Instead of rewriting all the previous functions, which is cumbersome,
 let's define a combinator that converts a check outputting an
 Either<E, A> into a check outputting a Either<NonEmptyArray<E>, A>
 */

type ENP<E, A> = Either<NonEmptyArray<E>, A>

function lift<E, A>
(check: (a: A) => Either<E, A>): (a: A) => ENP<E, A> {
	return a =>
		pipe (
			check (a),
			mapLeft (a => [a]),
		)
}

function validatePassword2 (s: string): ENP<string, string> {
	return pipe (
		sequenceT (applicativeValidation) (
			lift (minLength) (s),
			lift (oneCapital) (s),
			lift (oneNumber) (s),
		),
		map (() => s),
	)
}

it ('should validate password', async () => {
	expect.assertions (1)
	expect (validatePassword2 ('ab'))
		.toEqualLeft ([
			'at least 6 characters',
			'at least one capital letter',
			'at least one number',
		])
})


// Appendix
// Note that the sequenceT helper is able to handle actions with different types:
interface Person {
	name: string
	age: number
}

// Person constructor
const toPerson = ([name, age]: [string, number]): Person => ({
	name,
	age,
})

const validateName = (s: string): ENP<string, string> =>
	s.length === 0 ? left (['Invalid name']) : right (s)

const validateAge = (s: string): ENP<string, number> =>
	isNaN (+s) ? left (['Invalid age']) : right (+s)

function validatePerson (name: string, age: string): ENP<string, Person> {
	return pipe (
		sequenceT (applicativeValidation) (
			validateName (name), validateAge (age)),
		map (toPerson),
	)
}

it ('should validate person', async () => {
	expect.assertions (2)
	const act = validatePerson ('Ivan', '30')
	expect (act).toBeRight ()
	
	const act2 = validatePerson ('', 'hi')
	expect (act2).toEqualLeft ([
		'Invalid name',
		'Invalid age',
	])
})
