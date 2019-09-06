export default {} // fix 'cannot redeclare block-scoped variable'
import { string } from 'prop-types'
import { optimize } from 'webpack'

/**
 * USE LIVE TEMPLATES / POSTFIX / PLOP
 */

interface myInterface {
  param: () => void
  readonly param2: string // does not enforce?
}

class myClass implements myInterface {
  constructor(public param = () => console.log('null'),
              public _param2 = 'test'
  ) {
  }

  get param2(): string {
    return this._param2
  }

  set param2(value: string) {
    this._param2 = value
  }
}

const inst = new myClass()
inst.param2 = 'newvalue'
inst.param2 //?

const double = (value: number, index: number) =>
  ({ [index]: value * 2 })
console.log(
  [1, 3, 4].map(double))


const optionalArgs = (number: number, message?: string) => {
  if (message) { console.log(message) }
  return number * 2
}

optionalArgs(3, 'hello')//?
optionalArgs(3)//?


const nullishCoalescing = (n: number) =>
  (n || n === 0) ? n : false

nullishCoalescing(12) // ?
nullishCoalescing(0) // ?


/**
 * readonly
 */
// const arr: readonly string[] = ['one', 'two']
const arr = ['one', 'two'] as const


/**
 * using ternary as 'if' statement
 */
(1 > 0)
? console.log('false')
: console.log('true')

const x = 'Ω'.charCodeAt(0)//?
const hex = d => "0x" + Number(d).toString(16)
console.log(hex(x))
const y = '1'.charCodeAt(0) //?
String.fromCharCode(937) //?
String.fromCodePoint(937, 45, 78) //?
const hexa = hex(x)//?
const n36 = Number(99999999999999999).toString(36)

console.log(999845..toString(36)) // call method directly on number
console.log((999845).toString(36)) // call method directly on number
