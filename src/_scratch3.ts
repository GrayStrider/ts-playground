export {}

enum test {
	hello = 'hello',
}

type union =
	'hello' | 'world'

enum test2 {
	world
}

console.log(test.hello)
console.log(test2.world)

const str: test.hello = test.hello
const str2: union = 'hello'

const options: Record<union, string> = {
	world: '',
	hello: ''
}
