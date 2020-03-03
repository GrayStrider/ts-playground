export {}

enum test {
	hello = 'hello',
}

type union = 'hello' | 'world'

enum test2 {
	world,
}

console.log(test.hello)
console.log(test2.world)

const str: test.hello = test.hello
const str2: union = 'hello'

const options: Record<union, string> = {
	world: '',
	hello: '',
}

let person = {}

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y,
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
	console.log(person.name.toUpperCase())
	// do something with person.name, which is a string
}
