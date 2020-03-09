import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid, monoidSum, getStructMonoid, monoidAny, fold, monoidAll, monoidString, monoidProduct } from 'fp-ts/lib/Monoid'
import { getApplyMonoid, some, none, getFirstMonoid, getLastMonoid } from 'fp-ts/lib/Option'

// https://dev.to/gcanti/getting-started-with-fp-ts-monoid-ja0

/* In the last post we saw that a Semigroup captures the concept of "merging"
 values (via concat). A Monoid is any Semigroup that happens
 to have a special value which is "neutral" with respect to concat. */


interface _Monoid<A> extends Semigroup<A> {
	readonly empty: A
}


/*
 The following laws must hold
 
 Right identity: concat(x, empty) = x, for all x in A
 Left identity: concat(empty, x) = x, for all x in A
 Whichever side of concat we put the value empty, it must make no difference to the value.
 
 Note. If an empty value exists then is unique.
 */

//==========================================================
// Instances
//==========================================================

// Most of the semigroups we saw in the previous post are actually monoids:

/** number `Monoid` under addition */
const _monoidSum: Monoid<number> = {
	concat: (x, y) => x + y,
	empty: 0,
}

/** number `Monoid` under multiplication */
const _monoidProduct: Monoid<number> = {
	concat: (x, y) => x * y,
	empty: 1,
}

const _monoidString: Monoid<string> = {
	concat: (x, y) => x + y,
	empty: '',
}

/** boolean monoid under conjunction */
const _monoidAll: Monoid<boolean> = {
	concat: (x, y) => x && y,
	empty: true,
}

/** boolean monoid under disjunction */
const _monoidAny: Monoid<boolean> = {
	concat: (x, y) => x || y,
	empty: false,
}

/*
 You may wonder if all semigroups are also monoids. That's not the case, as a counterexample consider the following semigroup
 */

const semigroupSpace: Semigroup<string> = {
	concat: (x, y) => x + ' ' + y,
}

/*
 We can't find an empty value such that concat(x, empty) = x.
 
 Let's write some Monoid instances for more complex types.
 We can build a Monoid instance for a struct like Point:
 */

interface Point {
	x: number
	y: number
}

const monoidPoint: Monoid<Point> = getStructMonoid ({
	x: monoidSum,
	y: monoidSum,
})

// We can go on and feed getStructMonoid with the instance just defined

interface Vector {
	from: Point
	to: Point
}

const monoidVector: Monoid<Vector> = getStructMonoid ({
	from: monoidPoint,
	to: monoidPoint,
})

/*
 ==========================================================
 Folding
 ==========================================================
 When using a monoid instead of a semigroup, folding is even simpler:
 we don't need to explicitly provide an initial value
 (the implementation can use the monoid's empty value for that)
 */

it ('should fold using monoids', async () => {
	expect.assertions(5)
	expect(fold(monoidSum)([1, 2, 3, 4]))
		.toStrictEqual(10)
	expect(fold(monoidProduct)([1, 2, 3, 4]))
		.toStrictEqual(24)
	expect(fold(monoidString)(['a', 'b', 'c']))
		.toStrictEqual('abc')
	expect(fold(monoidAll)([true, false, true]))
		.toStrictEqual(false)
	expect(fold(monoidAny)([true, false, true]))
		.toStrictEqual(true)
})

/*
 ==========================================================
 Monoids for type constructors
 ==========================================================
 We already know that given a semigroup instance for A we can derive
  a semigroup instance for Option<A>.
 
 If we can find a monoid instance for A then we can derive
  a monoid instance for Option<A> (via getApplyMonoid) which works like this:
 
 ┌─────────┬─────────┬────────────────────┐
 │    x    │    y    │    concat(x, y)    │
 ├─────────┼─────────┼────────────────────┤
 │ none    │ none    │ none               │
 │ some(a) │ none    │ none               │
 │ none    │ some(a) │ none               │
 │ some(a) │ some(b) │ some(concat(a, b)) │
 └─────────┴─────────┴────────────────────┘
 
 */

it ('should concat Option monoids', async () => {
	expect.assertions(3)
	
	const M = getApplyMonoid(monoidSum)
	
	expect (M.concat(some(1), none))
		.toStrictEqual(none)
	expect (M.concat(some(1), some(2)))
		.toStrictEqual(some(3))
	expect (M.concat(some(1), M.empty))
		.toStrictEqual(some(1))
})

/*
 We can derive two other monoids for Option<A> (for all A)
 
 1) getFirstMonoid...
 
 Monoid returning the left-most non-None value
 
 ┌─────────┬─────────┬──────────────┐
 │    x    │    y    │ concat(x, y) │
 ├─────────┼─────────┼──────────────┤
 │ none    │ none    │ none         │
 │ some(a) │ none    │ some(a)      │
 │ none    │ some(a) │ some(a)      │
 │ some(a) │ some(b) │ some(a)      │
 └─────────┴─────────┴──────────────┘
 */

it ('should return left-most non-None value', async () => {
	expect.assertions(2)
	
	const M = getFirstMonoid<number>()
	
	expect (M.concat (some (1), none))
		.toStrictEqual(some(1))
	expect (	M.concat(some(1), some(2)))
		.toStrictEqual(some(1))
})

/*
 2) ...and its dual: getLastMonoid
 
 Monoid returning the right-most non-None value
 
 ┌─────────┬─────────┬──────────────┐
 │    x    │    y    │ concat(x, y) │
 ├─────────┼─────────┼──────────────┤
 │ none    │ none    │ none         │
 │ some(a) │ none    │ some(a)      │
 │ none    │ some(a) │ some(a)      │
 │ some(a) │ some(b) │ some(b)      │
 └─────────┴─────────┴──────────────┘
 */

it ('should return the right-most non-None value', async () => {
	expect.assertions(2)
	
	const M = getLastMonoid<number>()
	
	expect (M.concat(some(1), none))
		.toStrictEqual(some(1))
	expect (M.concat(some(1), some(2)))
		.toStrictEqual(some(2))
 
})
