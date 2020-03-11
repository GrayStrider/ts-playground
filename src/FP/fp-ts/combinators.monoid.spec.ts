//==========================================================
// https://dev.to/gcanti/functional-design-combinators-14pn
//==========================================================

import { IO, chain } from 'fp-ts/lib/IO'
import { Monoid, fold } from 'fp-ts/lib/Monoid'
import { replicate } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'

/*
 * Example 2: Monoid
 The getIOMonoid combinator: given an instance of Monoid
 * for A, we can derive an instance of Monoid for IO<A>
 */
export function getIOMonoid<A> (M: Monoid<A>): Monoid<IO<A>> {
	return {
		concat: (x, y) => () => M.concat (x (), y ()),
		empty: () => M.empty
	}
}

/*
 * We can use getIOMonoid to derive another combinator, replicateIO: given a number n and an action mv of type IO<void>, we can derive an action that performs n times mv
 *
 */

/** a primitive `Monoid` instance for `void` */
export const monoidVoid: Monoid<void> = {
	concat: () => undefined,
	empty: undefined
}

export function replicateIO (n: number, mv: IO<void>): IO<void> {
	return fold (getIOMonoid (monoidVoid)) (replicate (n, mv))
}

//==========================================================
// Usage
//==========================================================

//
// helpers
//

/** logs to the console */
export const log = (message: unknown): IO<void> =>
	() => console.log (message)

const listener = jest.fn ()
const call = (...args: unknown[]) =>
	() => listener (args)

/** returns a random integer between `low` and `high` */
export const randomInt = (low: number, high: number): IO<number> => {
	return () => Math.floor ((high - low + 1) * Math.random () + low)
}

function fib (n: number): number {
	return n <= 1 ? 1 : fib (n - 1) + fib (n - 2)
}

/** calculates a random fibonacci and prints the result to the console */
const printFib: IO<void> = pipe (
	randomInt (30, 35),
	chain (n => log (fib (n)))
)


it.skip ('should have an array of values', async () => {
	expect.assertions (1)
	listener ('false')
	replicateIO (3, printFib) ()
	expect (listener).toHaveBeenCalledWith ('false')
	
})
/*
 1346269
 9227465
 3524578
 */
