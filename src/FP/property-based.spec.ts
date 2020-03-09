import { Semigroup } from 'fp-ts/lib/Semigroup'
import * as fc from 'fast-check'
import { Monoid } from 'fp-ts/lib/Monoid'

/*
 Property based testing
 Property based testing is another way to test your
 code which is complementary to classical unit-test methods.
 
 It tries to discover inputs causing a property to be falsy by
 testing it against multiple generated random entries. In case
 of failure, a property based testing framework provides both a
 counterexample and the seed causing the generation.
 
 Let's apply property based testing to the Semigroup law:
 
 Associativity : concat(concat(x, y), z) = concat(x, concat(y, z))
 */


/*
 Testing a Semigroup instance
 We need three ingredients
 
 - a Semigroup<A> instance for the type A
 - a property that encodes the associativity law
 - a way to generate random values of type A
 */

const S: Semigroup<string> = {
	concat: (x, y) => x + ' ' + y,
}

const associativity = (x: string, y: string, z: string) =>
	S.concat (S.concat (x, y), z) ===
	S.concat (x, S.concat (y, z))


// An Arbitrary<A> is responsible to generate random values of type A.

const arb: fc.Arbitrary<string> = fc.string ()

it ('my semigroup instance should be lawful', () => {
	
	fc.assert (fc.property
	(arb, arb, arb, associativity))
})

// with expect; number of assertions from error log
it ('my semigroup instance should be lawful', () => {
	expect.assertions (100)
	fc.assert (fc.property
	(arb, arb, arb, (a, b, c) => {
		expect (associativity (a, b, c)).toBe (true)
	}))
})


//==========================================================
// Testing a Monoid instance
//==========================================================

/*
 Let's see what happens when an instance is lawless!
 
 As instance I'm going to use the following
 */

const M: Monoid<string> = {
	...S,
	empty: '',
}

/*
 We must encode the Monoid laws as properties:
 
 Right identity : concat(x, empty) = x
 Left identity : concat(empty, x) = x
 */
const rightIdentity = (x: string) => M.concat (x, M.empty) === x
const leftIdentity = (x: string) => M.concat (M.empty, x) === x

it ('my monoid instance should be lawful', () => {
	expect.assertions(2)
	expect (() => fc.assert (
		fc.property (arb, rightIdentity)),
	).toThrowError('failed')
	expect (() => fc.assert (
		fc.property (arb, rightIdentity)),
	).toThrowError('failed')
})
