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

describe ('should reset the state and between 2 tests', () => {
	it ('run 1', async () => {
		expect.assertions (2)
		isNow ('pending')
		
		pS.send ('RESOLVE')
		isNow ('resolved')
	})
	
	it ('run 2', async () => {
		expect.assertions (2)
		isNow ('pending')
		
		pS.send ('REJECT')
		isNow ('rejected')
	})
})

