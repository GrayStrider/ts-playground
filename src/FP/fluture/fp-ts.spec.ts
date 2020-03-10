import { reject, resolve, fork, promise } from 'fluture'
import { future } from 'fp-ts-fluture/lib/Future'
import { array } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

it ('should error', async () => {
	expect.assertions (1)
	array
		.sequence (future)
		([resolve (1), reject ('oops')]).pipe (
		fork (e => expect (e).toStrictEqual ('oops'))
		(identity))
})

it ('should resolve', async () => {
	expect.assertions (1)
	const res = array
		.sequence (future)
		([resolve (1), resolve (2)])
	expect (await pipe (res, promise))
		.toStrictEqual ([1, 2])
})

it ('futures should be equal', async () => {
	expect.assertions(1)
  expect (future.of(1))
	  .toStrictEqual(resolve(1))
})

