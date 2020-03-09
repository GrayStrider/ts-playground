import { Semigroup, getJoinSemigroup, getMeetSemigroup, semigroupSum, getStructSemigroup, getFunctionSemigroup, semigroupAll, fold, semigroupProduct } from 'fp-ts/lib/Semigroup'
import { ordNumber } from 'fp-ts/lib/Ord'
import { getApplySemigroup, none, some } from 'fp-ts/lib/Option'


/*
 
 https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7
 
 A semigroup is a pair (A, *) in which A is a non-empty set
 and * is a binary associative operation on A, i.e. a function
 that takes two elements of A as input and returns an element of A as output
 
 ... while associative means that the equation
 
 (x * y) * z = x * (y * z)
 holds for all x, y, z in A.
 
 Associativity simply tells us that we do not have to
 worry about parenthesizing an expression and can write x * y * z.
 
 Semigroups capture the essence of parallelizable operations
 
 There are plenty of examples of semigroups:
 
 (number, *) where * is the usual multiplication of numbers
 (string, +) where + is the usual concatenation of strings
 (boolean, &&) where && is the usual conjunction
 and many more.
 
 */

interface _Semigroup<A> {
	concat: (x: A, y: A) => A
}

/** number `Semigroup` under multiplication */
const _semigroupProduct: _Semigroup<number> = {
	concat: (x, y) => x * y,
}

/** number `Semigroup` under addition */
const _semigroupSum: _Semigroup<number> = {
	concat: (x, y) => x + y,
}

const _semigroupString: _Semigroup<string> = {
	concat: (x, y) => x + y,
}

/*
 I can't find an instance!
 
 What if, given a type A, you can't find an associative operation on A? You can create a (trivial) semigroup instance for every type just using the following constructions
 */

/** Always return the first argument */
function _getFirstSemigroup<A = never> (): _Semigroup<A> {
	return { concat: (x, y) => x }
}

/** Always return the second argument */
function _getLastSemigroup<A = never> (): _Semigroup<A> {
	return { concat: (x, y) => y }
}

/*
 Another technique is to define a semigroup instance for Array<A> (*),
 called the free semigroup of A.
 */

function _getArraySemigroup<A = never> (): Semigroup<Array<A>> {
	return { concat: (x, y) => x.concat (y) }
}

// and map the elements of A to the singleton elements of Array<A>

function _of<A> (a: A): Array<A> {
	return [a]
}

//================================================================================
// Deriving from Ord
//================================================================================

/** Takes the minimum of two values */
const semigroupMin: Semigroup<number> = getMeetSemigroup (ordNumber)

/** Takes the maximum of two values  */
const semigroupMax: Semigroup<number> = getJoinSemigroup (ordNumber)


it ('should test semigroups', async () => {
	expect.assertions (2)
	
	expect (semigroupMin.concat (2, 1)).toBe (1)
	expect (semigroupMax.concat (2, 1)).toBe (2)
})

//====================================================
// Let's write some Semigroup instances for more complex types
//====================================================

interface Point {
	x: number
	y: number
}

const semigroupPoint: Semigroup<Point> = getStructSemigroup ({
	x: semigroupSum,
	y: semigroupSum,
})

// We can go on and feed getStructSemigroup with the instance just defined

interface Vector {
	from: Point
	to: Point
}

const semigroupVector: Semigroup<Vector> = getStructSemigroup ({
	from: semigroupPoint,
	to: semigroupPoint,
})

/*
 getStructSemigroup is not the only combinator provided by fp-ts, here's
 combinator that allows to derive a Semigroup instance for functions:
 given an instance of Semigroup for S we can derive an instance of
 Semigroup for functions with signature (a: A) => S, for all A
 */

/** `semigroupAll` is the boolean semigroup under conjunction */
const semigroupPredicate = getFunctionSemigroup (semigroupAll)<Point> ()

// Now we can "merge" two predicates on Points

const isPositiveX = (p: Point) => p.x >= 0
const isPositiveY = (p: Point) => p.y >= 0

const isPositiveXY = semigroupPredicate.concat (isPositiveX, isPositiveY)

it ('should test function semigroups', async () => {
	expect.assertions (4)
	expect (isPositiveXY ({ x: 1, y: 1 })).toBe (true)
	expect (isPositiveXY ({ x: 1, y: -1 })).toBe (false)
	expect (isPositiveXY ({ x: -1, y: 1 })).toBe (false)
	expect (isPositiveXY ({ x: -1, y: -1 })).toBe (false)
})

/*
 ==========================================================
 Folding
 ==========================================================
 By definition concat works with only two elements of A,
 what if we want to concat more elements?
 
 The fold function takes a semigroup instance,
 an initial value and an array of elements:
 */

const sum = fold (semigroupSum)

it ('should test fold sum', async () => {
	expect.assertions (1)
	expect (sum (15, [1, 2, 3, 4])).toStrictEqual (25)
	
})

const product = fold (semigroupProduct)

it ('should test fold product', async () => {
	expect.assertions (1)
	expect (product (1, [1, 2, 3, 4])).toStrictEqual (24)
})

/*
 ==========================================================
 Semigroups for type constructors
 ==========================================================
 
 What if we want to "merge" two Option<A>? There are four cases:
 
 ┌─────────┬─────────┬──────────────┐
 │    x    │    y    │ concat(x, y) │
 ├─────────┼─────────┼──────────────┤
 │ none    │ none    │ none         │
 │ some(a) │ none    │ none         │
 │ none    │ some(a) │ none         │
 │ some(a) │ some(b) │ ?            │
 └─────────┴─────────┴──────────────┘
 
 There's a problem with the last one, we'd need something to "merge" two As.
 
 That's what Semigroup does! We can require a semigroup instance
 for A and then derive a semigroup instance for Option<A>.
 This is how the getApplySemigroup combinator works:
 */

const S = getApplySemigroup(semigroupSum)

it ('should test getApplySemigroup', async () => {
	expect.assertions(2)
  expect (S.concat(some(1), none))
	  .toStrictEqual(none)
	expect (S.concat(some(1), some(2)))
		.toStrictEqual(some(3))
})
