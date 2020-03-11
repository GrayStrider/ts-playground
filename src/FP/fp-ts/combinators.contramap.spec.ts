//==========================================================
// https://dev.to/gcanti/functional-design-combinators-14pn
//==========================================================
import { Eq, eqNumber, contramap } from 'fp-ts/lib/Eq'
import { getEq } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'
import { equals } from 'fp-ts-ramda'
import { isSE } from '@strider/utils-ts'


// Another combinator, contramap: given an instance of Eq for A
//  and a function from B to A, we can derive an instance of Eq for B
const _contramap = <A, B> (f: (b: B) => A) => (E: Eq<A>): Eq<B> => {
	return {
		equals: (x, y) => E.equals (f (x), f (y))
	}
}

interface User {
	id: number
	name: string
}

export const eqUser = contramap (
	(user: User) => user.id) (eqNumber)

const user1: User = { id: 10, name: 'sam' }
const user2: User = { id: 10, name: 'tom' }
const user3: User = { id: 45, name: 'tom' }

it ('should test user equality', async () => {
	expect.assertions (2)
	const eq = flow (equals)
	isSE (eq (eqUser)
	(user1) (user2), true)
	isSE (eq (eqUser)
	(user3) (user2), false)
})

it ('should work nested', async () => {
	expect.assertions (2)
	const eq = flow (getEq, equals)
	isSE (eq (eqUser)
	([user1, user3]) ([user2, user3]), true)
	isSE (eq (eqUser)
	([user2, user1]) ([user2]), false)
})
