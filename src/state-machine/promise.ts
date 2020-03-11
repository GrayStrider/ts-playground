import { Machine } from 'xstate'

interface promiseContext {

}

interface promiseSchema {
	states: {
		pending: {},
		resolved: {},
		rejected: {}
	}
}

type promiseEvent =
	| { type: 'RESOLVE' }
	| { type: 'REJECT' }

const promiseMachine = Machine<promiseContext, promiseSchema, promiseEvent>
({
	id: 'promise',
	initial: 'pending',
	states: {
		pending: {
			on: {
				RESOLVE: 'resolved',
				REJECT: 'rejected'
			}
		},
		resolved: {
			type: 'final'
		},
		rejected: {
			type: 'final'
		}
	}
})

export default promiseMachine
