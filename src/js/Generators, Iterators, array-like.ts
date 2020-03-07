import { sig, td } from '@strider/utils-ts'

/**
 * creates range object with iterator functionality
 * (Array.length(x).keys() is less flexible)
 * if length present, becomes also array-like
 * @param from
 * @param to
 */
const rangeIterator = (from: number, to: number) => ({
	length: to - from > 0 ? to - from : 0,

	[Symbol.iterator]: () => {
		return {
			current: from,
			last: to,

			next() {
				return this.current <= this.last
					? { done: false, value: this.current++ }
					: { done: true }
			},
		}
	},
})

const limit = 20000000

// no slowdown
withTime((args) => {
	for (let num of rangeIterator(0, limit)) {
		num && num > limit - 3 ? sig.debug(num) : null
	}
})

/**
 * generator
 */
function* range(start: number, upperLimit: number) {
	while (start < upperLimit + 1) yield start++
}

/**
 * 3 times slower!
 */
withTime(() => {
	for (let num of range(0, limit)) {
		num && num > limit - 10 ? sig.info(num) : null
	}
})

function withTime<T extends td.AnyFunction>(cb: T): ReturnType<T> {
	console.time()
	console.log('starting excecution')
	const res = cb()
	console.log('excecution took:')
	console.timeEnd()
	return res
}

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
	0: 'Hello',
	1: 'World',
	2: 'prop',
	length: 5, // needs this
}

console.log(Array.from(arrayLike))
console.log(Array.from(rangeIterator(-3, 4)))
// optional map function
console.log(
	Array.from(rangeIterator(-3, 5), (num) =>
		num !== undefined ? num * 2 : undefined
	)
)

namespace Generators {
	/** generator expressions*/
	function* generator(num: number) {
		yield num
		yield num * 2
		return `Done! ${num + 5}`
	}

	for (let generatorElement of generator(10)) {
		console.log(generatorElement)
	}
	const gen = generator(10)
	console.log(gen.next())
	console.log(gen.next())
	console.log(gen.next())

	/** async generator*/
	const sleep = (time: number) =>
		new Promise((resolve, reject) => setTimeout(resolve, time))

	async function* g() {
		yield 1
		await sleep(1000)
		yield* [2, 3]
		yield* (async function*() {
			await sleep(1000)
			yield 4
		})()
	}

	async function f() {
		for await (const x of g()) {
			console.log(x)
		}
	}

	f().then() // 1, 2-3, 4 with delays

	function* range(start: number, upperLimit: number) {
		while (start < upperLimit + 1) yield start++
	}

	console.log([...range(1, 10)])

	/** compare with regular array range*/
	const range2 = (length: number) => [...Array(length).keys()]
	console.log(range2(10))
}


export {}
