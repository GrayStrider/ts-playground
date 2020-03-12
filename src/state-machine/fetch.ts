import { Machine, assign } from 'xstate'

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

const fetchMachine = Machine<FetchContext, FetchSchema, FetchEvent> ({
	id: 'fetch',
	initial: 'idle',
	context: {
		retries: 0
	},
	states: {
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
						retries: ({ retries }, event) => retries + 1
					})
				}
			}
		}
	}
})


export default fetchMachine
