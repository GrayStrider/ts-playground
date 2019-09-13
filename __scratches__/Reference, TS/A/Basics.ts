//boolean
// number
// string, template

let object: object = {}
let arr: number[] = [1, 2] // array
let arr2: Array<number> = [1, 2] // generic Array type
let tuple: [number, string, boolean?] = [12, 'hello'] // tuple, optional params
// tuple[4] = 'test'; // union is used outside of known indices (Docs error)
// tuple[5] = /* false */ 'good'; // union is used outside of known indices (Docs error)
enum Colors { // enums
  Red, Green, Yellow = 3
}

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
let strLength2: number = (someValue as string).length // using as syntax

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
