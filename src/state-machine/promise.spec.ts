import { interpret } from 'xstate'
import pM, { promiseInterpreter } from './promise'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda/lib/prop'

let pS: promiseInterpreter

const listener = jest.fn ()
const listen = flow (prop ('value'), listener)

const isNow = (e?: keyof typeof pM.states) => expect
(listener).toHaveBeenLastCalledWith (e)

beforeEach (() => {
	listener.mockClear ()
	pS = interpret (pM)
		.onTransition (listen)
		.start ()
})

describe ('promise flow', () => {
	it ('should resolve', async () => {
		expect.assertions (4)
		isNow ('pending')
		
		pS.send ('RESOLVE')
		isNow ('resolved')
		
		pS.send ('RESOLVE')
		isNow ('resolved')
		
		pS.send ('REJECT')
		isNow ('resolved')
	})
	
	it ('should reject', async () => {
		expect.assertions (4)
		isNow ('pending')
		
		pS.send ('REJECT')
		isNow ('rejected')
		
		pS.send ('RESOLVE')
		isNow ('rejected')
		
		pS.send ('REJECT')
		isNow ('rejected')
	})
})
