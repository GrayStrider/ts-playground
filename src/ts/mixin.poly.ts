import { Person, Entity, Animal } from './handbook/advancedTypes'
import { poly, td } from '@strider/utils-ts'
import * as assert from 'assert'

class PolyPerson extends poly.classes(Person, Entity, Animal) {
	constructor(p: P<typeof Person>, m: P<typeof Entity>, a: P<typeof Animal>) {
		super([p], [m], [a])
	}

	get stats() {
		const { isFictional, species, name, age } = this
		return { isFictional, species, name, age }
	}

	get entityMethods() {
		return {
			first: super.class(Entity).isFictional,
		}
	}
}

/**
 * type of first argument in constructor,
 * in case of objectused as argument for better clarity
 */
type P<T extends td.AnyConstructor> = GetElementType<ConstructorParameters<T>>

const person = new PolyPerson({ name: 'Ivan', age: 25 }, 'real', 'human')

class Cat extends Animal {
	constructor(private favoriteSnacks?: string[]) {
		super('cat')
	}
}

const cat1 = new Cat()
const cat2 = new Cat(['fishes'])

assert.ok(person instanceof Person, 'is not person!')
assert.ok(person instanceof Animal)
assert.ok(person instanceof Entity)
assert.ok(person instanceof PolyPerson)
console.log(person.name)

const foo: ConstructorParameters<typeof Person> = [{ name: '', age: 25 }]

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never

const params: GetElementType<ConstructorParameters<typeof Person>> = {
	age: 25,
	name: 'Ivan',
}
