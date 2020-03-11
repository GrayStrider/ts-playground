import { interpret } from 'xstate'
import fetchMachine from './fetch'

const fS = interpret (fetchMachine)

const listener = jest.fn ()

fS.onTransition (x => listener (x.value))
// fS.onEvent (listener)
// ...
fS.start ()

const isNow = (e: unknown) => expect
(listener).toHaveBeenLastCalledWith (e)

it ('should flow through the state correctly', async () => {
	expect.assertions (3)
	
	isNow ('idle')
	
	fS.send ('FETCH')
	isNow ('loading')
	
	fS.send ('RESOLVE')
	isNow ('success')
	
})
