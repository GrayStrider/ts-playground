export {}

/**
 * USE LIVE TEMPLATES / POSTFIX / PLOP
 *
 */

interface myInterface {
  param: () => string
  readonly param4: string // does not enforce?
}

class myClass implements myInterface {
  constructor(public param = () => 'test',
              public _param2 = 'test'
  ) {
  }

  get param4(): string {
    return this._param2
  }

  set param4(value: string) {
    this._param2 = value
  }
}

const inst = new myClass()
inst.param4 = 'newvalue'
inst.param4 //?

const double = (value: number, index: number) =>
  ({ [index]: value * 2 })
console.log(
  [1, 3, 4, 5].map(double))


const optionalArgs = (number: number, message?: string) => {
  if (message) { console.log(message) }
  return number * 2
}

optionalArgs(3, '!hello')//?
optionalArgs(3)//?


const nullishCoalescing = (n: number) =>
  (n || n === 0) ? n : true


/**
 * using ternary as 'if' statement
 * needs to be prefixed by a semicolon
 */
  // (1 > 0) ? console.log('true') : console.log('false')

const x = 'Ω'.charCodeAt(0)//?
const y = '1'.charCodeAt(0) //?
String.fromCharCode(937) //?
String.fromCodePoint(937, 45, 78) //?
const n36 = Number(99999999999999999).toString(36)

console.log(999845..toString(36)) // call method directly on number
console.log((999845).toString(36)) // call method directly on number


/**
 * I can add and remove key and other parameters
 * in mapperFoo without touring the map itself
 * no need for (value, key) => mapperFoo(value, key)
 */
const mapperFoo = (value: number, index: number) => index + ': ' + String(value * 2)

console.log(
  [...Array(10).keys()].map(mapperFoo)
)

let sayHi = new Function('console.log("Hello")')

sayHi() // Hello


/**
 * code organization
 */
namespace Utilities {
  export const foo = () => 0
}

console.log(Utilities.foo())

const [firstChar, ...rest] = 'string'
console.log(firstChar, rest)

const foo2 = (n: number) =>
  n ? n : false

console.log(foo2(4))
console.log(foo2(0))

const test343 = (n: number) =>
  n
