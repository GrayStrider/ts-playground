import { identity } from 'ramda'

let person = {}

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y
): obj is X & Record<Y, unknown> {
	return obj.hasOwnProperty(prop)
}

// person is an object
if (
	typeof person === 'object' &&
	// person = { } & Record<'name', unknown>
	// = { } & { name: 'unknown'}
	hasOwnProperty(person, 'name') &&
	// yes! name now exists in person 👍
	typeof person.name === 'string'
) {
	identity(person.name.toUpperCase())
	// do something with person.name, which is a string
}
