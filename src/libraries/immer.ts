import produce from 'immer'

const baseState = [
	{
		todo: 'Learn typescript',
		done: true,
	},
	{
		todo: 'Try immer',
		done: false,
	},
]

const nextState = produce(baseState, draftState => {
	draftState.push({ todo: 'Tweet about it', done: false })
})

const mapper = produce((d, index) => {
	d.index ? d.index++ : (d.index = index)
})

console.dir([{}, { index: 10 }, {}].map(mapper))

