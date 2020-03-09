import { until, times, lte, repeat, add } from 'ramda'
import { chance } from '@strider/utils-ts'
import { all, equals, prop } from 'fp-ts-ramda'
import { pipe } from 'fp-ts/lib/pipeable'
import { eqNumber } from 'fp-ts/lib/Eq'
import { map } from 'fp-ts/lib/Array'
import * as S from 'sanctuary'

const morethanxwords = (len: 1 | 2 | 3 | 4 | 5 | 6) => until (
	({ length }: string[]) => equals (eqNumber) (10) (length),
	(curr) => {
		const word = chance.word ()
		return curr.concat (word.length > len ? word : [])
	},
	[],
)

it ('should have all words len > 6', async () => {
	expect.assertions (1)
	const words = morethanxwords (6)
	expect (pipe (
		words.map (prop('length')),
		all (lte (6)),
		),
	).toBe (true)
})

it ('through params', async () => {
	expect.assertions (1)
	const words = times (() => chance.word ({ length: 6 }), 10)
	expect (pipe (
		words.map (prop('length')),
		all (lte (6)),
		),
	).toBe (true)
})


it ('should equal', async () => {
	const eqp = pipe (
		map (equals (eqNumber) (10)),
	)
	
	expect.assertions (1)
	expect (eqp (repeat (10, 2))).toStrictEqual (
		repeat (true, 2),
	)
})

const allEqTo = (to: number) =>
	all (equals (eqNumber) (to))

allEqTo (10) ([10])

const eqP = pipe (
	all,
)

eqP (equals (eqNumber) (10)) ([10])

const foo = S.on <number[], number[], number[]>
(S.concat)
(map (add (4)))

const res = foo
([1, 2])
([3, 4, 5])


it ('should work', async () => {
	expect.assertions (1)
	expect (res).toStrictEqual ([5, 6, 7, 8, 9])
})

