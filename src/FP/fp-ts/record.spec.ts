import { isSE } from '@strider/utils-ts'
import { zip } from 'fp-ts/lib/ReadonlyArray'
import { keys, collect } from 'fp-ts/lib/Record'
import { values } from 'ramda'

const obj = {
	prop1: 'value',
	prop2: 'value'
}

it ('should zip', async () => {
	expect.assertions (1)
	const act = zip (keys (obj), values (obj))
	const exp = [['prop1', 'value'], ['prop2', 'value']]
	isSE (act, exp)
})

it ('should collect', async () => {
	expect.assertions (1)
	const entries = collect ((k, a) => [k, a])
	const act = entries (obj)
	const exp = [['prop1', 'value'], ['prop2', 'value']]
	isSE (act, exp)
})
