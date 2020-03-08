import { AnyObject } from 'tsdef'
import { keys } from 'fp-ts/lib/Record'

describe('proxy', () => {
	let target: AnyObject = {}
	let proxy = new Proxy(target, {}) // empty handler
	proxy.test = 5 // writing to proxy (1)

	it('should be accessible via proxy', async () => {
		expect.assertions(1)
		expect(keys(proxy)).toStrictEqual(['test'])
	})
})

it('should return 0 for non-existent values', async () => {
	expect.assertions(2)
	let numbers = [0, 1, 2]

	numbers = new Proxy(numbers, {
		get(target, prop: number) {
			if (prop in target) {
				return target[prop]
			} else {
				return 0 // default value
			}
		},
	})

	expect(numbers[1]).toStrictEqual(1)
	expect(numbers[123]).toStrictEqual(0)
})

it('should set', async () => {
	expect.assertions(2)

	let numbers: (number | string)[] = []

	numbers = new Proxy(numbers, {
		// (*)
		set(target, prop: number, val) {
			// to intercept property writing
			if (typeof val == 'number') {
				target[prop] = val
				return true
			} else {
				return false
			}
		},
	})

	numbers.push(1) // added successfully
	numbers.push(2) // added successfully
	expect(numbers.length).toBe(2)
	expect(() => numbers.push('test')).toThrowError(TypeError)
})

