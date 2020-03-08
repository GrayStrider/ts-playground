import { some, map, option } from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import { range, sum } from "ramda"
import * as Do from "ts-do"
import { array } from 'fp-ts/lib/Array'

const bind = Do.bind(option)
const into = Do.into(option)
const exec = Do.exec(option)
const sequence = Do.sequence(array, option)

const result = pipe(
	some(3),
	into("x"), // Chains the computation. Creates a context with { x: 3 }
	exec(() => some(undefined)), // Chains the computation. Adds nothing to the context
	sequence("ys", ({ x }) => range(0, x).map(() => some(1))), // Sequences computations. Adds { ys: [1, 1, 1] } to the context
	map(({ x, ys }) => x - sum(ys)),
)

test ('passes when it completes the pipe', async () => {
	expect.assertions(1)
  expect (result).toEqual(some(0))
})
