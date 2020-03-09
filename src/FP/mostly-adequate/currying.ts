import { pipe, last, map, prop, all, sortBy } from 'ramda'
import assert from 'assert'
import * as s from 'sanctuary'

const { log } = console

interface Maybe<A> {
	constructor: {
		'@@type': 'sanctuary/Maybe';
	};
}

const getWords = s.pipe([
	s.matchAll(/\S+/gu),
	s.map(s.prop('match')),
]) as (x: string) => string[]

const words = getWords('hello words!')
log(words)
log(s.unwords(words))

const hi = () => log('hi')
const world = () => log('world')

const getLetter = (pred: (a: ReadonlyArray<string>) => Maybe<string>) => s.pipe([
	s.splitOn(''),
	pred,
	s.fromMaybe(''),
	s.toUpper, log,
])


const preds = [
	s.head,
	s.last,
	s.find(s.equals('l')),
]
	.map(getLetter)
	.map(f => f('Hello'))


const isLastInStock = (car: Car[]) => pipe(last, prop('inStock'))

interface Car {
	inStock: boolean
	value: number
	name?: string
}

const cars: Car[] = [
	{ inStock: true, value: 10 },
	{ inStock: true, value: 15 },
]

type CarH = Car & { horsepower: number }
const cars2: CarH[] = [
	{ value: 10, inStock: true, horsepower: 122, name: 'one' },
	{ value: 10, inStock: true, horsepower: 125, name: 'three' },
	{ value: 10, inStock: true, horsepower: 124, name: 'two' },
]

const fastestCar = s.pipe([sortBy(prop('horsepower'))])
console.log(fastestCar(cars2))

console.log(s.pipe([
	s.map(s.prop('horsepower')),
	s.sort, s.last,
])(cars2))

const avg = (list: number[]) => s.sum(list) / list.length
assert(avg([10]) === 10)
assert(avg([2, 4]) === 3)

type ValuesOf<T extends any[]> = T[number]
type StringKeys<T> = Extract<keyof T, string>

const avgValue2 = <T extends unknown[]>(
	arr: T,
	val: Extract<KeysByCondition<ValuesOf<T>, number>, string>,
) => pipe(map(prop(val)), avg)(arr)

const allInStock = all(prop('inStock'), cars)
const avgValSimple = pipe(map(prop('value')), avg)(cars)
const avgValSimple2 = avg(map(prop('value'), cars))
const avgValSimple3 = avg(cars.map(prop('value')))

assert(avg([10, 15]) === 12.5)
assert(avgValue2(cars, 'value') === 12.5)
assert(avgValSimple === 12.5)
assert(avgValSimple2 === 12.5)
assert(avgValSimple3 === 12.5)

type O<T extends object> = StringKeys<T>

type C = O<Car>

type V<R extends C> = Car[R] extends number ? R : never

type KeysWithConstraint2<T extends object,
	C extends unknown,
	K extends O<T>> = T[K] extends C ? K : never

const foo = <T extends object, K extends O<T>, C>(arg: T, key: K) => arg

type K = Record<number, number>

type SubType<Base, Condition> = Pick<Base,
	{
		[Key in keyof Base]: Base[Key] extends Condition ? Key : never
	}[keyof Base]>

type KeysByCondition<Object, Condition> = keyof SubType<Object, Condition>

const extracted: KeysByCondition<Car, boolean> = 'inStock'

const Test: Extract<KeysByCondition<Car, number>, string> = 'value'

log(s.pipe([s.prop('foo'), s.lt(10)])({ foo: 10 }))
