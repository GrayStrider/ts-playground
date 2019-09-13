import { sleep } from './Async/sleep'

export { range }

/**
 * creates range object with iterator functionality
 * (Array.length(x).keys() is less flexible)
 * if length present, becomes also array-like
 * @param from
 * @param to
 */
const range = (from: number, to: number) => ({
  length: (to - from) > 0 ? (to - from) : 0,

  [Symbol.iterator]: () => {
    return {
      current: from,
      last:    to,

      next() {
        return this.current <= this.last
               ? { done: false, value: this.current++ }
               : { done: true }
      }
    }
  }
})

for (let num of range(0, 5))
  console.log(num)

console.log(
  [...range(1, 5)])

/**
 * manual Iterator interaction
 */
const str = 'Hello'
const iterator = str[Symbol.iterator]()
while (true) {
  const result = iterator.next()
  if (result.done) break
  console.log(result.value)
}

/**
 * array like, but not iterable
 */
let arrayLike = {
  0:      'Hello',
  1:      'World',
  2:      'prop',
  length: 5 // needs this
}

console.log(Array.from(arrayLike))
console.log(Array.from(range(-3, 4)))
// optional map function
console.log(Array.from(range(-3, 5), (num) =>
  num !== undefined
  ? num * 2
  : undefined))

namespace Generators {

  async function* g() {
    yield 1
    await sleep(100)
    yield* [2, 3]
    yield* (async function* () {
      await sleep(100)
      yield 4
    })()
  }

  async function f() {
    for await (const x of g()) {
      console.log(x)
    }
  }
}
