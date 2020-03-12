import { alt, range, ap, apFirst, map, apSecond, chain, chainFirst } from 'fp-ts/lib/Array'
import { isSE } from '@strider/utils-ts'
import { increment, flow } from 'fp-ts/lib/function'
import { add, repeat, flatten, split } from 'ramda'
import { pipe } from 'fp-ts/lib/pipeable'

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
	const f = split('')
	const ma = ['hello', 'world']
	const act = chain (f) (ma)
	const exp = flow( map(f), flatten)(ma)
	isSE (act, exp)
})

/**
 * 1 - maps every element over f
 * 2 - replaces every element of resulting array with element
 * 3 - flattens
 */
it ('chainFirst', async () => {
	expect.assertions (1)
	const f = split('')
	const ma = ['hello', 'myDarling']
	const act = chainFirst (f) (ma)
	const exp = flow(
		map((elem: string) => pipe(f(elem), map(x => elem))),
		flatten)(ma)
	isSE (act, exp)
})

