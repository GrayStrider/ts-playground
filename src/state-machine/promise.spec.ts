import { interpret } from 'xstate'
import pM from './promise'

let pS = interpret (pM)
const listener = jest.fn ()

const isNow = (e?: unknown) => expect
(listener).toHaveBeenLastCalledWith (e)

beforeEach (() => {
	listener.mockClear ()
	pS = interpret (pM).onTransition
	(x => listener (x.value))
	pS.start ()
})

describe ('promise flow', () => {
	it ('should resolve', async () => {
		expect.assertions(4)
		isNow('pending')
		
		pS.send('RESOLVE')
		isNow('resolved')
		
		pS.send('RESOLVE')
		isNow('resolved')
		
		pS.send('REJECT')
		isNow('resolved')
	})
	
	it ('should reject', async () => {
		expect.assertions(4)
		isNow('pending')
		
		pS.send('REJECT')
		isNow('rejected')
		
		pS.send('RESOLVE')
		isNow('rejected')
		
		pS.send('REJECT')
		isNow('rejected')
	})
})
