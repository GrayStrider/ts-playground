import { Eq, getStructEq, contramap } from 'fp-ts/lib/Eq'
import { getEq } from 'fp-ts/lib/Array'

const eqNumber: Eq<number> = {
	equals: (x, y) => x === y,
}

/*
 Instances must satisfy the following laws:
 
 Reflexivity: equals(x, x) === true, for all x in A
 Symmetry: equals(x, y) === equals(y, x), for all x, y in A
 Transitivity: if equals(x, y) === true and equals(y, z) === true, then equals(x, z) === true, for all x, y, z in A
 */


function elem<A> (E: Eq<A>): (a: A, as: Array<A>) => boolean {
	return (a, as) => as.some (item => E.equals (item, a))
}

elem (eqNumber) (1, [1, 2, 3]) // true
elem (eqNumber) (4, [1, 2, 3]) // false


//================================================================================
//
//================================================================================

interface Point {
	x: number
	y: number
}

const eqPoint1: Eq<Point> = {
	// reference equality
	equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.y === p2.y),
	// equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y
}

/*
 This is mostly boilerplate though. The good news is that we can build an Eq instance for a struct like Point if we can provide an Eq instance for each field.
 */

const eqPoint: Eq<Point> = getStructEq ({
	x: eqNumber,
	y: eqNumber,
})

// We can go on and feed getStructEq with the instance just defined

interface Vector {
	from: Point
	to: Point
}

const eqVector: Eq<Vector> = getStructEq ({
	from: eqPoint,
	to: eqPoint,
})

// here's a combinator that allows to derive an Eq instance for arrays:

const eqArrayOfPoints = getEq (eqPoint)

test ('passes when arrays of points are equal', async () => {
	expect.assertions (2)
	const first: Point[] = [{ x: 1, y: 2 }, { x: 2, y: 4 }]
	const second: Point[] = [{ x: 1, y: 2 }, { x: 2, y: 4 }]
	expect (eqArrayOfPoints.equals (first, second))
		.toBe (true)
	expect (eqArrayOfPoints.equals (first, [
		{
			x: 0, y: 0,
		},
	])).toBe (false)
})


//================================================================================
// Contramap
//================================================================================


interface User {
	userId: number
	name: string
}

/** two users are equal if their `userId` field is equal */
const eqUser = contramap ((user: User) => user.userId) (eqNumber)


test ('passes when users are equal', async () => {
	expect.assertions (2)
	expect (eqUser.equals (
		{ userId: 1, name: 'Giulio' },
		{ userId: 1, name: 'Giulio Canti' }))
		.toBe (true)
	expect (eqUser.equals (
		{ userId: 1, name: 'Giulio' },
		{ userId: 2, name: 'Giulio' }))
		.toBe (false)
})
