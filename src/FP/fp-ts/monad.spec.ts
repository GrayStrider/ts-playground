import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'

interface User {
	followers: Array<User>
}

const getFollowers = (user: User) =>
	user.followers

const user = {
	followers: []
}

const followersOfFollowers =
	getFollowers (user).map (getFollowers)

/*
 There's something wrong here, followersOfFollowers has the type
 Array<Array<User>> but we want Array<User>.
 
 We need to flatten the nested arrays.
 
 The flatten: <A>(mma: Array<Array<A>>) => Array<A> function exported
 by fp-ts comes in handy
 */

const followersOfFollowers2 = A.flatten (
	getFollowers (user).map (getFollowers))


// Say we want to calculate the inverse of the A.head of a numeric list

const inverse = (n: number) =>
	n === 0 ? O.none : O.some(1 / n)

const inverseHead = O.option.map(
	A.head([1, 2, 3]), inverse)

/*
 Opss, I did it again, inverseHead has the type Option<Option<number>>
 but we want Option<number>.
 
 We need to flatten the nested Options.
 */

const flatten = <A>(mma: O.Option<O.Option<A>>): O.Option<A> =>
	(O.isNone(mma) ? O.none : mma.value)

const inverseHead2: O.Option<number> = O.flatten(
	O.option.map(A.head([1, 2, 3]), inverse))


// ...

const followersOfFollowers3: Array<User> =
	A.array.chain(getFollowers(user), getFollowers)

const headInverse3: O.Option<number> = O.option.chain(
	A.head([1, 2, 3]), inverse)
