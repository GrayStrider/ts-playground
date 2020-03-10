import produce, { applyPatches, Patch, enablePatches } from 'immer'

enablePatches ()

interface State {
	name: string
	age: number
}

let state: State = {
	name: 'Micheal',
	age: 32,
}

// Let's assume the user is in a wizard, and we don't know whether
// his changes should end up in the base state ultimately or not...
let fork = state
// all the changes the user made in the wizard
let changes: Array<Patch> = []
// the inverse of all the changes made in the wizard
let inverseChanges: Array<Patch> = []

fork = produce (
	fork,
	draft => {
		draft.age = 33
	},
	// The third argument to produce is a callback to which the patches will be fed
	(patches, inversePatches) => {
		changes.push (...patches)
		inverseChanges.push (...inversePatches)
	},
)

it ('should have updated age', async () => {
	expect.assertions (1)
	expect (fork.age).toStrictEqual (33)
})

// In the meantime, our original state is replaced, as, for example,
// some changes were received from the server
state = produce (state, draft => {
	draft.name = 'Michel'
})

it ('should have updated name', async () => {
	expect.assertions (2)
	expect (state.name).toStrictEqual ('Michel')
	expect (state.age).toStrictEqual (32)
})

it ('should contain all changes', async () => {
	expect.assertions (3)
	const expchanges = [
		{
			'op': 'replace',
			'path': [
				'age',
			],
			'value': 33,
		},
	]
	expect (changes).toStrictEqual (expchanges)
	expect (state).toEqual ({
		name: 'Michel', // changed by the server
		age: 32, // changed by the wizard
	})
	
	// When the wizard finishes (successfully) we can replay the changes that were in the fork onto the *new* state!
	state = applyPatches (state, changes)

// state now contains the changes from both code paths!
	
	expect (state).toEqual ({
		name: 'Michel', // changed by the server
		age: 33, // changed by the wizard
	})
})



it ('should revert changes', async () => {
	expect.assertions (1)
	
	// Finally, even after finishing the wizard, the user might change his mind and undo his changes...
	state = applyPatches (state, inverseChanges)
	
	expect (state).toEqual ({
		name: 'Michel', // Not reverted
		age: 32, // Reverted
	})
})
