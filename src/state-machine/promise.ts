import { Machine, Interpreter } from 'xstate'

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
	context: {},
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
export type promiseInterpreter = Interpreter<promiseContext, promiseSchema, promiseEvent>
