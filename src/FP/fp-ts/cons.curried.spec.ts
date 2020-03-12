import { cons as cons_ } from 'fp-ts/lib/ReadonlyNonEmptyArray'
import { isSE } from '@strider/utils-ts'

it ('cons', async () => {
	expect.assertions (1)
	const act = cons_ (0, [1, 2])
	const exp = [0, 1, 2]
	isSE (act, exp)
})

export const cons = <A> (head: A) =>
	(tail: ReadonlyArray<A>) => cons_ (head, tail)


it ('cons curried', async () => {
	expect.assertions (1)
	const act = cons (0)
	const exp = [0, 1, 2]
	isSE (act ([1, 2]), exp)
})

it ('cons curried empty', async () => {
	expect.assertions (1)
	const act = cons (0)
	const exp = [0]
	isSE (act ([]), exp)
})

