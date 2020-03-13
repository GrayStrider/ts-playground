import { replicate as replicate_ } from 'fp-ts/lib/Array'
import { isSE } from '@strider/utils-ts'
import { toUpper, toLower } from 'ramda'


function replicate (n: number): <A> (a: A) => Array<A>
function replicate<A> (a: A): (n: number) => Array<A>
function replicate<A> (n: number, a: A): Array<A>

function replicate<A> (n: number | A, a?: A) {
	if (typeof n === 'number') {
		if (a !== undefined) {
			return replicate_ (n, a)
		}
		return (a: A) => replicate_ (n, a)
	} else
		return (a: number) => replicate_ (a, n)
}

it ('should curry', async () => {
	expect.assertions (1)
	const repeatTwice = replicate (2)
	const act = repeatTwice ('boom').map (toUpper)
	const exp = ['BOOM', 'BOOM']
	isSE (act, exp)
})

it ('should curry from the other end', async () => {
	expect.assertions (1)
	const supress = replicate ('BA-BOOM')
	const act = supress (2).map (toLower)
	const exp = ['ba-boom', 'ba-boom']
	isSE (act, exp)
})

it ('should be backwards-compatible', async () => {
	expect.assertions (1)
	const act = replicate (2, 'good').map (toUpper)
	const exp = ['GOOD', 'GOOD']
	isSE (act, exp)
})
