import { interpret } from 'xstate'
import pM from './promise'

let pS = interpret (pM)
const listener = jest.fn ()

const is = (act: unknown = true, exp: unknown = false) => expect
(act).toStrictEqual (exp)

const isNow = (e?: unknown) => expect
(listener).toHaveBeenLastCalledWith (e)

beforeEach (() => {
	listener.mockClear ()
	pS = interpret (pM).onTransition
	(x => listener (x.value))
	pS.start ()
})

describe ('should reset the state and between 2 tests', () => {
	it ('run 1', async () => {
		expect.assertions (2)
		isNow ('pending')
		
		pS.send('RESOLVE')
		isNow('resolved')
	})
	
	it ('run 2', async () => {
		expect.assertions (2)
		isNow ('pending')
		
		pS.send('REJECT')
		isNow('rejected')
	})
})
