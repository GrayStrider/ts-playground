//Benefits
// Immutability with normal JavaScript objects, arrays,
//  Sets and Maps. No new APIs to learn!
// Strongly typed, no string based paths selectors etc.
// Structural sharing out of the box
// Object freezing out of the box
// Deep updates are a breeze
// Boilerplate reduction. Less noise, more concise code.
// First class support for patches
// Small: 3KB gzipped

import produce, { Draft } from 'immer'

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


it ('should produce state', async () => {
	expect.assertions (6)
	const newData = { todo: 'Tweet about it', done: false }
	
	
	const nextState = produce (baseState, draftState => {
		draftState.push (newData)
		draftState[1].done = true
	})
	// the new item is only added to the next state,
// base state is unmodified
	expect (baseState.length).toBe (2)
	expect (nextState.length).toBe (3)

// same for the changed 'done' prop
	expect (baseState[1].done).toBe (false)
	expect (nextState[1].done).toBe (true)

// unchanged data is structurally shared
	expect (nextState[0]).toBe (baseState[0])
// changed data not (dûh)
	expect (nextState[1]).not.toBe (baseState[1])
	
})

const mapper = produce ((d, index) => {
	d.index ? d.index++ : (d.index = index)
})

it ('should transform', async () => {
	expect.assertions (1)
	const act = [{}, { index: 10 }, {}].map (mapper)
	const exp = [{ 'index': 0 }, { 'index': 11 }, { 'index': 2 }]
	expect (act).toStrictEqual (exp)
})

//==========================================================
// Section
//==========================================================

interface State {
	readonly x: number
}

// `x` cannot be modified here
const state: State = {
	x: 0,
}

const increment = produce ((draft: Draft<State>, inc: number) => {
	// `x` can be modified here
	draft.x += inc
})

// inline increment using void
const incr = produce ((draft: Draft<State>, inc: number) =>
	void (draft.x += inc))

incr (state, 2)

const newState = increment (state, 2)
// `newState.x` cannot be modified here
