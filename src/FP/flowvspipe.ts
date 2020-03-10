import * as assert from "assert"
import { pipe } from 'fp-ts/lib/pipeable'
import { flow } from 'fp-ts/lib/function'
import { toUpper, toLower } from 'ramda'

const a = () => 10
const a2 = (a2: string) => a2.length
const cb1 = (b: number) => b > 2
const cb2 = (c: boolean) => c ? 'ok' : 'fail'
assert.strictEqual (cb2 (cb1 (a ())), 'ok')
assert.strictEqual (cb2 (cb1 (a2 ('f'))), 'fail')

assert.strictEqual (pipe (
	a (), cb1, cb2), 'ok')

assert.strictEqual (pipe (
	a2 ('f'), cb1, cb2), 'fail')

const flow1 = flow (a2, cb1, cb2)
assert.strictEqual (flow1('f'), 'fail')

// first argument has to be already provided, and the value is returned
pipe('hello', toUpper, toLower)

// compare to
const myFlow = flow(toUpper, toLower)
myFlow('hello')

// untyped
function makeFlow(func1: (a: any) => unknown, func2: (a: any) => unknown) {
	
	return (initial: any) => pipe(initial, func1, func2)
}

const customFlow = makeFlow(toUpper, toLower)
customFlow('hello')
