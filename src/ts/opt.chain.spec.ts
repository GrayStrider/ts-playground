import { head } from 'ramda'

it('should return undefined on missing data', async () => {
	expect.assertions(2)
	interface Object {
		param: {
			param3: {
				param4: string
			}
			param2: string
		}
		
		[key: string]: unknown
	}
	
	const obj: Object = {
		param: {
			param2: 'test',
			param3: {
				param4: '123',
			},
		},
	}
  expect(obj?.parm).toBeUndefined()
	expect(obj.param).toBeDefined()
})

it('should return undefined on missing element', async () => {
	expect.assertions(5)

	const tryGetFirstElement = <T>(arr?: T[]) => {
		return arr?.[0]
		// equivalent to
		//   return (arr === null || arr === undefined) ?
		//       undefined :
		//       arr[0]
	}
	
	expect(tryGetFirstElement([1, 2, 3])).toBe(1)
	expect(tryGetFirstElement([])).toBeUndefined()
	expect(tryGetFirstElement()).toBeUndefined()
	expect(head([])).toBeUndefined()
	expect(head([1])).toBe(1)
})

it('should not call function if not provided', async () => {
	expect.assertions(1)
	const cbOpt = jest.fn()
  const func = jest.fn((cb?: Function) => cb?.())
	func(cbOpt)
	func()
	expect(cbOpt).toHaveBeenCalledTimes(1)
})
