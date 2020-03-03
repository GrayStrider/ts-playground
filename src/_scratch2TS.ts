import _ from 'lodash'

export interface IFormValues {
	artworkName: string
	artistName: string
	number: number
}

const values: IFormValues = {
	artistName: 'Me',
	artworkName: 'blah',
	number: 20,
}

const entries = Object.entries as <T>(
	o: T,
) => [Extract<keyof T, string>, T[keyof T]][]

type o = { [key: string]: number }
let o: o = { x: 5 }

console.log(entries(o))

let p = <[keyof o, number][]>Object.entries(o)
p.map(([k, v]) => v + 1)

console.log(p)

type oneOf = IFormValues[keyof IFormValues]

const obj = {
	prop1: 'value',
	prop2: 'value',
}

const result = _.map(values, (value, prop) => [
	prop + '_',
	typeof value === 'number' ? value + 1 : value + '_',
])

console.log(result)

type CastObjectToType<Obj extends object, TypeToCastTo> = Record<keyof Obj,
	TypeToCastTo>

const obj1 = {
	prop: 'hello',
	prop2: 10,
}

const obj2: CastObjectToType<typeof obj1, string> = {
	prop: 'test',
	prop2: 'works',
}

type ObjectKeys<Obj extends object> = (keyof Obj)[]
const keys: ObjectKeys<typeof obj> = ['prop1', 'prop2']

const foo = <Obj extends object, Key extends keyof Obj>(
	arg: Obj,
	arg2: Key,
) => {}
const foo2 = <Obj extends object>(arg: Obj, arg2: keyof Obj) => {}

foo(obj1, 'prop2')
