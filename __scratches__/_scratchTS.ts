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

const test343 = (n: number) => n

namespace MapGeneric {

  const arrayMap = <Elem, Mapped>(func: (elem: Elem) => Mapped):
    (arr: Elem[]) => Mapped[] =>
    arr => arr.map(func)

  const lengths: (a: string[]) => number[] =
    arrayMap(s => s.length)

  console.log(
    lengths(['123', '343', 'test']))

  console.log(
    arrayMap((elem: number) => elem * 2)
    ([1, 2, 3]))

  interface Mappable<T> {
    map<U>(f: (x: T) => U): Mappable<U>;
  }

  declare let a: Mappable<number>
  declare let b: Mappable<string | number>

  const mappable: Mappable<string> = ['test', 'another']
  console.log(mappable)

  interface Interface {
    method: () => 0
  }

}

namespace ConstantNamedProps {
  const Foo = 'string_key'
  const Bar = '-another-one-'
  const Baz = 'puts in brackets if not a valid key'

  let x = {
    [Foo]: 100,
    [Bar]: 'hello',
    [Baz]: true
  }
  const a = x[Baz]
  console.log(a)
  console.log(x)
  console.log(Object.values(x))
  console.log(Object.keys(x))
}

namespace DefinitiveAssignmentAssertion {
  class C {
    foo!: number
    // ^
    // Notice this '!' modifier.
    // This is the "definite assignment assertion"

    constructor() {
      this.initialize()
    }

    initialize() {
      this.foo = 0
    }
  }

  let x!: number
  initialize()

  // No error!
  console.log(x + x)

  // equal to x! + x!

  /**
   * will not work with function expression
   */
  function initialize() {
    x = 10
  }

  /**
   * non-null assertion
   */
  let y: number
  console.log(y! + 12) // no error!
}

const million = 1_000_000
console.log(million) // numeric separators

/**
 * typeguards, is keyword,
 * rest spread
 */
namespace TypeGuards {
  type NonEmptyArray<T> = [T, ...T[]];

  const isNonEmptyArray = <T>(arr: T[]):
    arr is NonEmptyArray<T> =>
    arr.length > 0

  const arr: NonEmptyArray<string | number> = ['string', 0]
}

/**
 * Hey, TypeScript, I would like to be able to index into this
 * interface with a string, and I should get either a string or a
 * number back. Oh, and please don’t let me add any other thing to any
 * object that implements this interface that I didn’t explicitly
 * specify.
 *
 * PROBABLY NOT NEEDED, but interesting usage of readonly.
 */
interface ComponentState {
  nameError: string;
  ageError: string;
  numOfFields: number;
  readonly [x: string]: string | number;
}


interface A {
  prop: string
}

interface B {
  prop: number
  prop2: boolean
}

interface C {
  prop: string
  prop2: boolean

}

const test: A | B | C = { prop: 40, prop2: false } // implement either interface
const test2: A & C = { prop: 'false', prop2: false } // implement all interfaces
// const test3: B & C = { prop: 'false', prop2: false } // impossible type; string and number are incompatible
