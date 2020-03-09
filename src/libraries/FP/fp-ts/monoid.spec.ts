import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid, monoidSum, getStructMonoid, monoidAny, fold, monoidAll, monoidString, monoidProduct } from 'fp-ts/lib/Monoid'

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
