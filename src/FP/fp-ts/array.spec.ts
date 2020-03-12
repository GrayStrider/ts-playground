import { alt, range, ap, apFirst, map, apSecond, chain, chainFirst, chop, spanLeft, chunksOf, compact, copy, deleteAt, comprehension } from 'fp-ts/lib/Array'
import { isSE } from '@strider/utils-ts'
import { increment, flow, tuple } from 'fp-ts/lib/function'
import { add, repeat, flatten, split } from 'ramda'
import { pipe } from 'fp-ts/lib/pipeable'
import { Eq, eqNumber } from 'fp-ts/lib/Eq'
import { some, none, fromNullable, getOrElse, toNullable } from 'fp-ts/lib/Option'
import { cons } from './cons.curried.spec'

const nums = range (0, 5)
const nums2 = range (5, 10)

/**
 * reverse concat from function
 */
it ('alt', async () => {
	expect.assertions (1)
	const act = alt
	(() => nums)
	(nums2)
	const exp = nums2.concat (nums)
	isSE (act, exp)
})

/**
 * apply each func on element, concatenate results
 */
it ('ap', async () => {
	expect.assertions (1)
	const act = ap
	(nums)
	([increment, add (3)])
	const exp = range (1, 6).concat (range (3, 8))
	isSE (act, exp)
})

/**
 * each element of b gets repeated a.length times,
 * then merged
 */
it ('apFirst', async () => {
	expect.assertions (1)
	const act = apFirst
	(nums)
	(['hello', 'world'])
	const exp3 = pipe (
		['hello', 'world'],
		map (x => repeat (x, nums.length)),
		flatten)
	isSE (act, exp3)
})

/**
 * whole first array gets repeated b.length times,
 * then merged
 */
it ('apFirst', async () => {
	expect.assertions (1)
	const fa = ['hello', 'world']
	const fb = [true, false]
	const act = apSecond
	(fb)
	(fa)
	const exp3 = pipe (
		fb,
		x => repeat (x, fa.length),
		flatten)
	isSE (act, exp3)
})

/**
 * Maps each element of ma over f, flattens the results
 */
it ('chain', async () => {
	expect.assertions (1)
	const f = split ('')
	const ma = ['hello', 'world']
	const act = chain (f) (ma)
	const exp = flow (map (f), flatten) (ma)
	isSE (act, exp)
})

/**
 * 1 - maps every element over f
 * 2 - replaces every element of resulting array with element
 * 3 - flattens
 */
it ('chainFirst', async () => {
	expect.assertions (1)
	const f = split ('')
	const ma = ['hello', 'myDarling']
	const act = chainFirst (f) (ma)
	const exp = flow (
		map ((elem: string) => pipe (f (elem), map (x => elem))),
		flatten) (ma)
	isSE (act, exp)
})


/**
 * A useful recursion pattern for processing an array to produce a new array, often used for “chopping” up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 */
describe ('chop', () => {
	const group = <A> (S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) =>
		chop (as => {
			const { init, rest } = spanLeft
			((a: A) => S.equals (a, as[0]))
			(as)
			return [init, rest]
		})
	
	it ('should group repeating elements', async () => {
		expect.assertions (1)
		const act = group (eqNumber) ([1, 1, 2, 3, 3, 4])
		const exp = [[1, 1], [2], [3, 3], [4]]
		isSE (act, exp)
	})
})

/**
 * Splits an array into length-n pieces.
 */
it ('chunksOf', async () => {
	expect.assertions (1)
	const act = chunksOf (2) (range (1, 5))
	const exp = [[1, 2], [3, 4], [5]]
	isSE (act, exp)
})

describe ('compact', () => {
	/**
	 * removes none and extracts the values
	 */
	it ('compact Opt', async () => {
		expect.assertions (1)
		const fa = [some (1), none, some (2)]
		const act = compact (fa)
		const exp = [1, 2]
		isSE (act, exp)
	})
	
	/**
	 * note that it doesnt work on falsy values;
	 * use ramda-adjunct instead for that, or
	 * filter(Boolean)
	 */
	it ('removes null / undefined', async () => {
		expect.assertions (1)
		const fa = [null, 0, 'hello', undefined]
		const act = flow (map (fromNullable), compact) (fa)
		const exp = [0, 'hello']
		isSE (act, exp)
	})
})

describe ('comprehension', () => {
	
	const exp = [
		[1, 'a'],
		[1, 'b'],
		[3, 'a'],
		[3, 'b']
	]
	const input: [number[], string[]] =
		[
			[1, 2, 3], ['a', 'b']
		]
	const act = comprehension (
		input,
		tuple,
		(a, b) => (a + b.length) % 2 === 0
	)
	
	it ('comprehension', async () => {
		expect.assertions (1)
		isSE (act, exp)
	})
})

it ('cons', async () => {
	expect.assertions (1)
	const act = cons (0)([1, 2])
	const exp = [0, 1, 2]
	isSE (act, exp)
})

it ('should copy', async () => {
	expect.assertions (3)
	const as = range (0, 5)
	const as_ = copy (as)
	expect (as).toBe (as)
	expect (as).not.toBe (as_)
	isSE (as, as_)
})


describe ('delete at', () => {
	it ('should delete at', async () => {
		expect.assertions (1)
		const deleteThird = deleteAt (2)
		const act = pipe (deleteThird ([1, 2, 3]),
			toNullable)
		const exp = [1, 2]
		isSE (act, exp)
	})
	
	it ('none when not found', async () => {
		expect.assertions (1)
		const deleteThird = deleteAt (2)
		const act = deleteThird ([3, 4])
		isSE (act, none)
		
	})
})

