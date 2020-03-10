import { HKT } from 'fp-ts/lib/HKT'
import { flatten } from 'fp-ts/lib/Array'
import { Functor } from 'fp-ts/lib/Functor'

interface Apply<F> extends Functor<F> {
	ap: <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>
}

type Curried2<B, C, D> = (b: B) => (c: C) => D

function liftA2<F> (
	F: Apply<F>,
): <B, C, D>(g: Curried2<B, C, D>) => Curried2<HKT<F, B>, HKT<F, C>, HKT<F, D>> {
	return g => fb => fc => F.ap (F.map (fb, g), fc)
}

const applicativeArray = {
	map: <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => fa.map(f),
	of: <A>(a: A): Array<A> => [a],
	ap: <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
		flatten(fab.map(f => fa.map(f))),
	URI: ['']
}

// it ('should test lift', async () => {
// 	expect.assertions(1)
//   liftA2(applicativeArray)
// })
