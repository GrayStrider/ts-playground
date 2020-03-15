import { Machine, assign, Interpreter, StatesConfig } from 'xstate'

interface FetchContext {
	retries: number
}

type FetchEvent =
	| { type: 'FETCH' }
	| { type: 'RESOLVE' }
	| { type: 'REJECT' }
	| { type: 'RETRY' }
	
	
interface FetchSchema {
	states: {
		idle: {},
		loading: {},
		success: {},
		failure: {}
	}
}


const states: StatesConfig<FetchContext, FetchSchema, FetchEvent> = {
	idle: {
		on: {
			FETCH: 'loading'
		}
	},
	loading: {
		on: {
			RESOLVE: 'success',
			REJECT: 'failure'
		}
	},
	success: {
		type: 'final'
	},
	failure: {
		on: {
			RETRY: {
				target: 'loading',
				actions: assign ({
					retries: ({ retries }) => retries + 1
				})
			}
		}
	}
}

const fetchMachine = Machine<FetchContext, FetchSchema, FetchEvent> ({
	id: 'fetch',
	initial: 'idle',
	context: {
		retries: 0
	},
	states
})

type FetchInterpreter = Interpreter<FetchContext, FetchSchema, FetchEvent>
export {fetchMachine, FetchInterpreter}
