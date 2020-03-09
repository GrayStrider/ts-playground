import { Ord, fromCompare, contramap, getDualOrd, ordNumber, min, ordString } from 'fp-ts/lib/Ord'
import { eqNumber } from 'fp-ts/lib/Eq'
import { sort } from 'fp-ts/lib/Array'
import { chance, sig } from '@strider/utils-ts/index'
import { times, until } from 'ramda'
import { IO } from 'fp-ts/lib/IO'

/*
 We say that
 
 x < y if and only if compare(x, y) is equal to -1
 x is equal to y if and only if compare(x, y) is equal to 0
 x > y if and only if compare(x, y) is equal to 1
 As a consequence we can say that x <= y if and only if compare(x, y) <= 0
 */

const MyordNumber: Ord<number> = {
	compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0),
	equals: eqNumber.equals,
}

test ('passes when number are ordered', async () => {
	expect.assertions (3)
	expect (ordNumber.compare (1, 2)).toEqual (-1)
	expect (ordNumber.compare (1, 1)).toEqual (0)
	expect (ordNumber.compare (2, 1)).toEqual (1)
})

/*
 Instances must satisfy the following laws:
 
 Reflexivity: compare(x, x) === 0, for all x in A
 Antisymmetry: if compare(x, y) <= 0 and compare(y, x) <= 0 then x is equal to y, for all x, y in A
 Transitivity: if compare(x, y) <= 0 and compare(y, z) <= 0 then compare(x, z) <= 0, for all x, y, z in A
 Additionally compare must comply with Eq's equals:
 
 compare(x, y) === 0 if and only if equals(x, y) === true, for all x, y in A
 
 Note. A lawful equals can be derived from compare in the following way
 equals: (x, y) => compare(x, y) === 0
 */


/**
 * Indeed the module fp-ts/lib/Ord exports an handy fromCompare helper which allows you to define an Ord instance by
 * simply specifying a compare function!
 */

const ordNumber2: Ord<number> = fromCompare (
	(x, y) => (x < y ? -1 : x > y ? 1 : 0))

test ('passes when numbers are equal', async () => {
	expect.assertions (2)
	expect (ordNumber.equals (1, 2)).toBe (false)
	expect (ordNumber.equals (2, 2)).toBe (true)
})


function min2<A> (O: Ord<A>): (x: A, y: A) => A {
	return (x, y) => (O.compare (x, y) === 1 ? y : x)
}

test ('passes when min value is found', async () => {
	expect.assertions (1)
	expect (min (ordNumber) (2, 1)).toBe (1)
})

/*
 Totality might seem obvious (i.e. either x <= y or y <= x)
 when we're talking about numbers, but this isn't always the case.
 Let's consider a more complex type
 */

interface User {
	name: string
	age: number
}


/*
 How can we define an Ord<User>?
 Well it really depends, but a possible choice is to sort users by their age
 */

const byAge2: Ord<User> = fromCompare (
	(x, y) => ordNumber.compare (x.age, y.age))

/*
 We can avoid some boilerplate by using the contramap combinator: given an instance of Ord for A and a function from B to A, we can derive an instance of Ord for B
 */

const byAge = contramap ((user: User) => user.age) (ordNumber)

// Now we can pick the younger of two users using min

const getYounger = min (byAge)

it ('should compare users', async () => {
	expect.assertions (1)
	const first = { name: 'Guido', age: 48 }
	const second = { name: 'Giulio', age: 45 }
	expect (getYounger (first, second)).toBe (second)
	
})

/*
 What if we want to pick the older instead? We'd need to "reverse the order",
 or more technically speaking, get the dual order.
 
 Fortunately there's another exported combinator for this
 */

const max = <A> (O: Ord<A>): (x: A, y: A) => A =>
	min (getDualOrd (O))

const getOlder = max (byAge)

it ('should get older', async () => {
	expect.assertions (1)
	const first = { name: 'Guido', age: 48 }
	const second = { name: 'Giulio', age: 45 }
	expect (getOlder (first, second)).toBe (first)
	
})

it ('should sort strings', async () => {
	expect.assertions (1)
	expect (sort (ordString) (['c', 'a', 'b', '0', 'Z', '*', 'F']))
		.toStrictEqual (['*', '0', 'F', 'Z', 'a', 'b', 'c'])
})

it ('should sort words', () => {
	const input: IO<Array<string>> = () =>
		times (() => chance.word (), 10)
	sig.info (input ())
	sig.success (sort (ordString) (input ()))
})




