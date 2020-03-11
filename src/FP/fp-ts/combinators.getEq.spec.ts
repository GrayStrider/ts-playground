//==========================================================
// https://dev.to/gcanti/functional-design-combinators-14pn
//==========================================================
import { Eq, eqNumber, eqString } from 'fp-ts/lib/Eq'
import { equals } from 'fp-ts-ramda'
import { isSE } from '@strider/utils-ts'
import { flow } from 'fp-ts/lib/function'
import { getEq } from 'fp-ts/lib/Array'


// The getEq combinator: given an instance of Eq for A, we can derive an instance of Eq for Array<A>
function _getEq<A> (E: Eq<A>): Eq<Array<A>> {
	return {
		equals: (xs, ys) => xs.length === ys.length && xs.every ((x, i) => E.equals (x, ys[i]))
	}
}

it ('should test equality', async () => {
	expect.assertions (4)
	const eq = flow (equals)
	isSE (eq (eqNumber)
	(10) (10), true)
	isSE (eq (eqNumber)
	(10) (0), false)
	isSE (eq (eqString)
	('10') ('10'), true)
	isSE (eq (eqString)
	('10') ('1'), false)
})

it ('should test equality arrays', async () => {
	expect.assertions (4)
	const eq = flow (getEq, equals)
	isSE (eq (eqNumber)
	([1, 1]) ([1, 1]), true)
	isSE (eq (eqNumber)
	([1, 1]) ([0, 1, 4]), false)
	isSE (eq (eqString)
	(['foo', 'bar']) (['foo', 'bar']), true)
	isSE (eq (eqString)
	(['foo', 'bar']) (['bar', 'foo']), false)
	
})

it ('should work nested', async () => {
	expect.assertions (4)
	const eq = flow (getEq, getEq, equals)
	isSE (eq (eqNumber)
	([[1], [1]]) ([[1], [1]]), true)
	isSE (eq (eqNumber)
	([[1], [65]]) ([[1], [24]]), false)
	isSE (eq (eqString)
	([['1'], ['10', '1']]) ([['1'], ['10', '1']]), true)
	isSE (eq (eqString)
	([['bar'], ['1', 'foo']]) ([['1'], ['foo']]), false)
	
})
