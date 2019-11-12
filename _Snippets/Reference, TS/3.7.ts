import { AssertionError } from 'assert'

export {}

//================================================================================
// Optional chaining
//================================================================================

interface Foo {
  bar?: {
    baz?: () => any
  }
}

const foo: Foo = {}
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}
// After-ish
if (foo?.bar?.baz) {
  // ...
}


//================================================================================
// Nullish coalescing
//================================================================================

const bar = (num?: number) =>
  num ?? 100
console.log(bar()) // 100
console.log(bar(0)) // 0, works correctly (|| would coerce to 'false')
console.log(bar(20)) // 20


//================================================================================
// Assertion functions
//================================================================================


// function assertIsString(val: any): asserts val is string {
//   if (typeof val !== "string") {
//     throw new AssertionError({message: "Not a string!"});
//   }
// }
//
// function yell(str: any) {
//   assertIsString(str);
//   // Now TypeScript knows that 'str' is a 'string'.
//   return str.toUpperCase();
// }

//================================================================================
// Recursive types
//================================================================================

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];
