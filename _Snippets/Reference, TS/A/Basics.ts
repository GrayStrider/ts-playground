//boolean
// number
// string, template

let object: object = {}
let arr: number[] = [1, 2]
let arr2: Array<number> = [1, 2]
// tuple, optional:
let tuple: [number, string, boolean?] = [12, 'hello']

enum Colors { // enums
  Red, Green, Yellow = 3
}

// string or undefined inferred
const foo2 = (optional?: string) =>
  optional

const immutable = (arr: readonly any[]) => {
  const [first] = arr
  // arr.push('new') // can't mutate, readonly arg
}

/**
 * tuple type for ...rest
 * rest element in tuple types []
 */
const foo3 = (...args: [boolean, number, Function?, ...string[]]) =>
  args
console.log(foo3(false, 30))
console.log(foo3(false, 30, () => 0))
console.log(foo3(false, 30, () => 0, 'str'))
// console.log(foo3(false, 30, 'str')) // note the error due to types order

console.log(Colors.Yellow, Colors.Green) // assign index manually
// enums get reverse mappings
console.log(Colors)

enum Strings { // string enums
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
} // string enums do not get reverse mappings
console.log(Strings)

/**
 * completely inlined:
 * compiles to 0, 1, ...
 */
const enum CONSTENUMS {'ONE', 'TWO'}

console.log(CONSTENUMS.TWO)

let vAny: any = 10
let vUnknown: unknown = 10
// vAny.method() // no error (only during call)
// console.log(vUnknown.metod()); // error

let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length // type assertion
let strLength2: number = (someValue as string).length // using "as" syntax

const objc: { [key: string]: string } = {
  // type string accepts numbers, while type number
  // does not accept string (JS coerces keys to string)
  2: 'prop',
  1: 'prop2',
  4: 'prop3'
}

namespace never {
  const error = (message: string): never => { // never
    throw new Error(message)  // Function returning never must have unreachable end point
  }

  const fail = () =>  // Inferred return type is never
    error('Something failed')

  const move1 = (direction: 'up' | 'down') => {
    switch (direction) {
      case 'up':
        return 1
      case 'down':
        return -1
    }
    return error('Should never get here')
  }

// Inferred return type is number
  const move2 = (direction: 'up' | 'down') =>
    direction === 'up' ? 1 :
    direction === 'down' ? -1 :
    error('Should never get here')

// Inferred return type is T
  /**
   * returns and calls error? Interesting
   * @param x
   */
  const check = <T>(x: T | undefined) =>
    x || error('Undefined value')
  const y = undefined
  console.log(check(10))
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


namespace TypeCasting {
  interface User {
    name: string
    age: number
  }

  /**
   * With no specified/inferred types
   */
  const importedModule = {}
  const casted = importedModule as User
  // const casted = <User>importedModule // same result, less readable

  /**
   * We tell TS that we know what this module is
   */
  casted.age = 20
  casted.name = 'Ivan'

  console.log(casted)

  /**
   * Doesn't make sense, so errors
   */
  // type myNum = 100
  // const string = 'string'
  // const casted2 = string as myNum
}
