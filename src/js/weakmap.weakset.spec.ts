import { AnyObject } from 'tsdef'

describe ('weakmaps', () => {
	const map = new WeakMap ()
	let obj: object = {}
	
	map.set (obj, 'someValue')
	
	it ('should be accessible', async () => {
		expect.assertions (1)
		expect (map.get(obj)).toStrictEqual('someValue')
		
	})
	
	it ('should not be accessible', async () => {
		expect.assertions(1)
	  // @ts-ignore
		// have to do this, since map.get does not allow null values
		obj = null
		expect (map.get(obj)).toStrictEqual(undefined)
	})
})

