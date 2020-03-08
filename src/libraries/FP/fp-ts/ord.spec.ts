import { Ord, fromCompare } from 'fp-ts/lib/Ord'
import { eqNumber } from './eq.spec'


/*
 We say that
 
 x < y if and only if compare(x, y) is equal to -1
 x is equal to y if and only if compare(x, y) is equal to 0
 x > y if and only if compare(x, y) is equal to 1
 As a consequence we can say that x <= y if and only if compare(x, y) <= 0
 */

const ordNumber: Ord<number> = {
	compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0),
	...eqNumber,
}

test ('passes when number are ordered', async () => {
	expect.assertions(3)
  expect (ordNumber.compare(1,2)).toEqual(-1)
  expect (ordNumber.compare(1,1)).toEqual(0)
  expect (ordNumber.compare(2,1)).toEqual(1)
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
	expect.assertions(2)
  expect (ordNumber2.equals(1,2)).toBe(false)
  expect (ordNumber2.equals(2,2)).toBe(true)
})
