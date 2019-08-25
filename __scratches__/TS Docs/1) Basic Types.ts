//boolean
// number
// string, template
let arr: number[] = [1, 2]; // array
let arr2: Array<number> = [1, 2]; // generic Array type
let tuple: [number, string, boolean?] = [12, 'hello'] // tuple, optional params
// tuple[4] = 'test'; // union is used outside of known indices (Docs error)
// tuple[5] = /* false */ 'good'; // union is used outside of known indices (Docs error)
enum Colors { // enums
  Red, Green, Yellow = 3
}
console.log(Colors.Yellow, Colors.Green); // assign index manually
// enums get reverse mappings
console.log(Colors);
enum Strings { // string enums
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
} // string enums do not get reverse mappings
console.log(Strings);
let vAny: any = 10
let vUnknown: unknown = 10
// vAny.method() // no error (only during call)
// console.log(vUnknown.metod()); // error
function error(message: string): never { // never
  throw new Error(message);  // Function returning never must have unreachable end point
}
function fail() { // Inferred return type is never
  return error("Something failed");
}
// object is a type that represents the non-primitive type
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // type assertion
let strLength2: number = (someValue as string).length; // using as syntax
