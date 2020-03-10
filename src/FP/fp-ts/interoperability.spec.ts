import { Option, none, some, fromNullable } from 'fp-ts/lib/Option'
import { tryCatch, Either, right, left } from 'fp-ts/lib/Either'
import { IO } from 'fp-ts/lib/IO'
import { IOEither, tryCatch as tryCatchIO } from 'fp-ts/lib/IOEither'
import * as fs from 'fs'
import { AnyObject } from 'tsdef'



// Sentinels

// Use case: an API that may fail and returns a special value of the codomain.
function findIndex<A> (as: Array<A>, predicate: (a: A) => boolean): Option<number> {
	const index = as.findIndex (predicate)
	return index === -1 ? none : some (index)
}

it ('should find index', async () => {
	expect.assertions (1)
	const res = findIndex ([1], (i) => i < 2)
	expect (res).toStrictEqual (some (0))
	
})

it ('should return none', async () => {
	expect.assertions (1)
	expect (findIndex ([], () => false)).toEqual (none)
})


// Use case: an API that may fail and returns undefined (or null).

function find<A> (as: Array<A>, predicate: (a: A) => boolean): Option<A> {
	return fromNullable (as.find (predicate))
}

it ('should find some', async () => {
	expect.assertions (1)
	const res = find ([1, 2, 3], (i) => i > 1)
	expect (res).toEqual (some (2))
	
})

it ('should return none', async () => {
	expect.assertions (1)
	expect (find ([], () => false)).toBe (none)
})


// Exceptions
// Use case: an API that may throw.

function parse <T = AnyObject>(s: string): Either<Error, T> {
	return tryCatch (() => JSON.parse (s), reason => new Error (String (reason)))
}

it ('should parse JSON', async () => {
	expect.assertions (1)
	const res = parse <{foo: string}> ('{"foo": "bar"}')
	expect (res).toEqualRight ({ foo: 'bar' })
})

it ('should match', async () => {
	expect.assertions (1)
	expect (right ({ foo: 'bar', baz: 10 })).toMatchRight ({ foo: 'bar' })
})

it ('should return error', async () => {
	expect.assertions (1)
	const res = parse ('{234}')
	expect (res).toBeLeft ()
	
})

it ('passes when value is an Either', () => {
	expect (left (true)).toBeEither ()
	expect (right (true)).toBeEither ()
})

it ('passes when value is not an Either', () => {
	expect (undefined).not.toBeEither ()
})

// Random values
// Use case: an API that returns a non deterministic value.

const random: IO<number> = () => Math.random ()

// Synchronous side effects
// Use case: an API that reads and/or writes to a global state.

function getItem (key: string): IO<Option<string>> {
	return () => fromNullable (localStorage.getItem (key))
}

// Use case: an API that reads and/or writes to a global state and may throw.

function readFileSync (path: string): IOEither<Error, string> {
	return tryCatchIO (() => fs.readFileSync (path, 'utf8'), reason => new Error (String (reason)))
}

test ('passes when file is read correctly', async () => {
	expect.assertions(1)
	const res = readFileSync ('package.json')
	
	expect (res()).toBeRight()
})

test ('passes when file doest exist', async () => {
	expect.assertions(1)
  const res = readFileSync('a/b/c/d##%%')
	expect (res()).toBeLeft()
})
