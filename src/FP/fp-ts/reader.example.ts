// You can think of Reader as an effect, muck like Either or Task.
//
// Let's say you have the following snippet

import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { flow } from 'fp-ts/lib/function'
import * as RE from 'fp-ts/lib/ReaderEither'

declare function f (s: string): E.Either<Error, number>

declare function g (n: number): boolean

declare function h (b: boolean): E.Either<Error, Date>

// composing `f`, `g`, and `h` -------------v---------v-----------v
const result = pipe (
	E.right ('foo'),
	E.chain (f),
	E.map (g),
	E.chain (h),
)

const pointFreeVersion = flow (
	f,
	E.map (g),
	E.chain (h),
)


// and at some point you must refactor f to

interface Dependencies {
	foo: string
}

declare function f_ (s: string): RE.ReaderEither<Dependencies, Error, number>

// result and pointFreeVersion must be refactored as well, fortunately you can use ReaderEither's monadic interface

// after
const result_ = pipe (
	RE.right ('foo'),
	RE.chain (f_),
	RE.map (g),
	RE.chain (b => RE.fromEither (h (b))),
)

const pointFreeVersion_ = flow (
	f_,
	RE.map (g),
	RE.chain (b => RE.fromEither (h (b))),
)
