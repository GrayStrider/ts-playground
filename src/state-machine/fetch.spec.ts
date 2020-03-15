import { interpret } from 'xstate'
import { fetchMachine as fM, FetchInterpreter } from './fetch'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda/lib/prop'

let fS: FetchInterpreter

const listener = jest.fn ()
const listen = flow (prop ('value'), listener)

const isNow = (e?: keyof typeof fM.states) => expect
(listener).toHaveBeenLastCalledWith (e)

beforeEach (() => {
	listener.mockClear ()
	fS = interpret (fM)
		.onTransition (listen)
		.start ()
})


it ('should flow through the state correctly', async () => {
	expect.assertions (3)
	
	isNow ('idle')
	
	fS.send ('FETCH')
	isNow ('loading')
	
	fS.send ('RESOLVE')
	isNow ('success')
	
})
