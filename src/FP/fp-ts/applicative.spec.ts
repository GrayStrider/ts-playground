import { flatten, ap } from 'fp-ts/lib/Array'
import { increment, identity, flow } from 'fp-ts/lib/function'
import { multiply } from 'ramda'

const applicativeArray = {
	map: <A, B> (fa: Array<A>, f: (a: A) => B): Array<B> => fa.map (f),
	of: <A> (a: A): Array<A> => [a],
	ap: <A, B> (fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
		flatten (fab.map (f => fa.map (f))),
}


it ('should apply ops on each element', async () => {
	expect.assertions (1)
	const act = ap ([1, 2, 3]) ([increment, multiply (2)])
	expect (act).toStrictEqual ([2, 3, 4, 2, 4, 6])
})


it ('should map ops on each element', async () => {
	expect.assertions(1)
	const res = identity ([1, 2, 3]).map (flow (
		increment,
		multiply (2),
	))
	expect (res).toStrictEqual([4, 6, 8])
	
})
