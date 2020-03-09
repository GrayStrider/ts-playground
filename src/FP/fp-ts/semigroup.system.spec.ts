/*
 ==========================================================
 Appendix
 ==========================================================
 We've seen that semigroups help us any time we want to "concat", "merge",
 or "combine" (whatever word gives you the best intuition)
 several data into one.
 
 Let's wrap all together with a final example (adapted from Fantas, Eel,
 and Specification 4: Semigroup)
 
 Let's imagine you're building some system in which you store
 customer records that look like this:
 */

import { Semigroup, getStructSemigroup, getJoinSemigroup, getMeetSemigroup, semigroupAny } from 'fp-ts/lib/Semigroup'
import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { getMonoid } from 'fp-ts/lib/Array'

interface Customer {
	name: string
	favouriteThings: Array<string>
	registeredAt: number // since epoch
	lastUpdatedAt: number // since epoch
	hasMadePurchase: boolean
}

/*
 For whatever reason you might end up with duplicate records for the
 same person. What we need is a merge strategy.
 That's what semigroups are all about:
 */

const semigroupCustomer: Semigroup<Customer> = getStructSemigroup ({
	// keep the longer name
	name: getJoinSemigroup (contramap (
		(s: string) => s.length) (ordNumber)),
	// accumulate things
	favouriteThings: getMonoid<string> (), // <= getMonoid returns a
	// Semigroup for `Array<string>` see later
	
	// keep the least recent date
	registeredAt: getMeetSemigroup (ordNumber),
	// keep the most recent date
	lastUpdatedAt: getJoinSemigroup (ordNumber),
	// Boolean semigroup under disjunction
	hasMadePurchase: semigroupAny,
})

it ('should merge records', async () => {
	expect.assertions (1)
	const first = {
		name: 'Giulio',
		favouriteThings: ['math', 'climbing'],
		registeredAt: new Date (2018, 1, 20).getTime (),
		lastUpdatedAt: new Date (2018, 2, 18).getTime (),
		hasMadePurchase: false,
	}
	const second = {
		name: 'Giulio Canti',
		favouriteThings: ['functional programming'],
		registeredAt: new Date (2018, 1, 22).getTime (),
		lastUpdatedAt: new Date (2018, 2, 9).getTime (),
		hasMadePurchase: true,
	}
	const act = semigroupCustomer.concat (first, second)
	const exp: Customer = {
		name: 'Giulio Canti',
		favouriteThings: ['math', 'climbing', 'functional programming'],
		registeredAt: new Date(2018, 1, 20).getTime(),
		lastUpdatedAt: new Date(2018, 2, 18).getTime(),
		hasMadePurchase: true,
	}
	expect (act).toStrictEqual(exp)
})
