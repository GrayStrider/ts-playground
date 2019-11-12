import { objectify, sum } from '../Reference, JS (esnext)/B/Arrays'
import { Generators } from '../Reference, JS (esnext)/C/Generators, Iterators, array-like'
import range2 = Generators.range2

// describe('sum', () => {
//   it('should sum values',
//     () => {
//       const input = [1, 2, 3]
//       const output = 6
//       expect(sum(input)).toBe(output)
//     })
// })
//
// describe('test', () => {
//   it('should create an array of integers',
//     () => {
//       const input = 5
//       const output = [0, 1, 2, 3, 4]
//       expect(range2(input)).toStrictEqual(output)
//     })
// })

describe('objectify', () => {
  it('should convert to object', () => {
    const input = [
      { name: 'Nick', grade: 10 },
      { name: 'John', grade: 15 },
    ]
    const output = { Nick: 10, John: 15 }
    expect(objectify(input)).toMatchObject(output)
  })
})

const testCases: { input: unknown; output: unknown }[] = [
  { input: 1, output: 3 },
  { input: 1, output: 3 },
  { input: 1, output: 3 },
  { input: 1, output: 3 },
]
