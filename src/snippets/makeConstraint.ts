import { right, left, fold } from 'fp-ts/lib/Either'
import { curry } from 'ramda'
import { sig } from '@strider/utils-ts'

function makeConstrained (min: number, max: number) {
	return (val: number) => val >= min && val <= max
		? right (val)
		: left (new Error
			(`Value should be within range ${min} -> ${max}, ${val} received`),
		)
}

const min10 = makeConstrained (10, 15)

const addCB = <K extends any[], R>
(a: (...args: K) => R) =>
	(...args: K) =>
		<T> (b: (args: R) => T) =>
			b (a (...args))

const val10 = addCB (min10)
const val10_ = curry (min10)

val10_ (10)

val10 (10) (fold (sig.error, sig.success))
