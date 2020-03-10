import * as t from 'io-ts'
import { either, fold } from 'fp-ts/lib/Either'
import { prop } from 'fp-ts-ramda'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Array'
import { PathReporter } from 'io-ts/lib/PathReporter'

const User = t.type ({
	userId: t.number,
	name: t.string,
})

it ('should validate input', async () => {
	expect.assertions (1)
	const res = User.decode ({
		foo: 123,
		bar: false,
		userId: null,
		name: 'haz'
	})
	pipe(res, PathReporter.report, console.log)
	const act = either.map (res, prop ('name'))
	console.log (pipe (act, fold (
		map (x =>
			`"${x.value}" is not a valid value for field ...`),
		console.log,
	)))
	expect (act).toBeLeft ()
})
