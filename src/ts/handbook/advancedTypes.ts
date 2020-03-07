import { r, mix } from '@strider/utils-ts'

const list = r.times(r.gt(r.__, 5), 10)
const filtered = list.filter(Boolean)
const opposite = list.filter(r.complement(Boolean))

// Determines how ts-mixer will mix class prototypes together
mix.settings.prototypeStrategy = 'copy'
// Determines how static properties are inherited
mix.settings.staticsStrategy = 'copy'

/**
 * Wrong examples, every person is an Animal etc
 */

class Person {
	name: string
	age: number
	constructor({ name, age }: { name: string; age: number }) {
		this.name = name
		this.age = age
	}
}

class Entity {
	constructor(public isFictional: 'fictional' | 'real') {}
}

type Species = 'human' | 'cat'

class Animal {
	constructor(public species: Species) {}
}

class MyPerson extends mix.Mixin(Person, Entity, Animal) {
	get stats() {
		const { isFictional, species, name, age } = this
		return { isFictional, species, name, age }
	}
}

// how to use multiple constructors?
// avoid this, look Polytype
const person = new MyPerson('cat')

/**
 * Generic classes
 */
class Foo<T> {
	public fooMethod(input: T): T {
		return input
	}
}

class Bar<T> {
	public barMethod(input: T): T {
		return input
	}
}

interface FooBar<T1, T2> extends Foo<T1>, Bar<T2> {}

@mix.mix(Foo, Bar)
class FooBar<T1, T2> {
	public fooBarMethod(input1: T1, input2: T2) {
		return [this.fooMethod(input1), this.barMethod(input2)]
	}
}

export { Animal, Entity, Person }
