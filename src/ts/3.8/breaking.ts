let obj1: { [x: string]: number } | { a: number }

// obj1 = {a: 5, c: 'abc'}

// Error!
// The type '{ [x: string]: number }' no longer exempts 'c'
// from excess property checks on '{ a: number }'.

let obj2: { [x: string]: number } | { [x: number]: number }

// obj2 = {a: 'abc'}

// Error!
// The types '{ [x: string]: number }' and '{ [x: number]: number }' no longer exempts 'a'
// from excess property checks against '{ [x: number]: number }',
// and it *is* sort of an excess property because 'a' isn't a numeric property name.
// This one is more subtle.
