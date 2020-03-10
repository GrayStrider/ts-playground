//==========================================================
// Codec representing string
//==========================================================

import * as t from 'io-ts'
import { flow } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { map } from 'fp-ts/lib/Array'
import { prop } from 'fp-ts-ramda'

const isString = (u: unknown): u is string => typeof u === 'string'

const string = new t.Type<string, string, unknown> (
	'string',
	isString,
	(u, c) => (isString (u)
		? t.success (u) :
		t.failure (u, c,
			`value '${u}' cannot be parsed to string`)),
	t.identity,
)

it ('should decode string', async () => {
	expect.assertions (1)
	expect (string.decode (false)).toBeLeft ()
	const decode = flow (
		string.decode,
		fold (
			flow (
				map(x => x.message ?? 'error parsing string'),
				x => console.error('Errors: ', x)),
			console.log),
	)
	decode (null)
	decode ('hello')
})
