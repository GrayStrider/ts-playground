import 'reflect-metadata'
import * as assert from 'assert'

//================================================================================
// Class decorator
//================================================================================
const Sealed: ClassDecorator = (ctor) => {
	Object.seal(ctor)
	Object.seal(ctor.prototype)
}

@Sealed
class Greeter {
	greeting: string
	constructor(message: string) {
		this.greeting = message
	}
	greet() {
		return 'Hello, ' + this.greeting
	}
}

//================================================================================
// Constructor override
//================================================================================

function ClassDecorator<T extends { new (...args: any[]): {} }>(
	constructor: T
) {
	return class extends constructor {
		newProperty = 'new property'
		hello = 'override'
	}
}

@ClassDecorator
class Greeter2 {
	property = 'property'
	hello: string
	constructor(m: string) {
		this.hello = m
	}
}

console.log(new Greeter('world'))

//================================================================================
// Method decorator
//================================================================================
const Enumerable = (value: boolean): MethodDecorator => (
	target,
	propertyKey,
	descriptor
) => {
	descriptor.enumerable = value
}

class Greeter3 {
	greeting: string
	constructor(message: string) {
		this.greeting = message
	}

	@Enumerable(false)
	greet() {
		return 'Hello, ' + this.greeting
	}
}

//================================================================================
// Accessor decorator
//================================================================================
const Configurable = (value: boolean): MethodDecorator => (
	target,
	propertyKey,
	descriptor
) => {
	descriptor.configurable = value
}

class Point {
	private readonly _x: number
	private readonly _y: number
	constructor(x: number, y: number) {
		this._x = x
		this._y = y
	}

	@Configurable(false)
	get x() {
		return this._x
	}

	@Configurable(false)
	get y() {
		return this._y
	}
}

//================================================================================
// Property decorator
//================================================================================
const formatMetadataKey = Symbol('format')

const format = (formatString: string) =>
	Reflect.metadata(formatMetadataKey, formatString)

const getFormat = (target: any, propertyKey: string) =>
	Reflect.getMetadata(formatMetadataKey, target, propertyKey)
class Greeter4 {
	@format('Hello, %s')
	greeting: string

	constructor(message: string) {
		this.greeting = message
	}
	greet() {
		let formatString = getFormat(this, 'greeting')
		return formatString.replace('%s', this.greeting)
	}
}

//================================================================================
// Parameter decorator
//================================================================================
const requiredMetadataKey = Symbol('required')

const Required: ParameterDecorator = (target, propertyKey, parameterIndex) => {
	let existingRequiredParameters: number[] =
		Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
	existingRequiredParameters.push(parameterIndex)
	Reflect.defineMetadata(
		requiredMetadataKey,
		existingRequiredParameters,
		target,
		propertyKey
	)
}

type UntypedMethodDecorator = (
	target: Object,
	propertyKey: string | symbol,
	descriptor: PropertyDescriptor
) => PropertyDescriptor | void

const Validate: UntypedMethodDecorator = (target, propertyName, descriptor) => {
	let method = descriptor.value
	descriptor.value = function() {
		let requiredParameters: number[] = Reflect.getOwnMetadata(
			requiredMetadataKey,
			target,
			propertyName
		)
		if (requiredParameters) {
			for (let parameterIndex of requiredParameters) {
				if (
					parameterIndex >= arguments.length ||
					arguments[parameterIndex] === undefined
				) {
					throw new Error('Missing required argument.')
				}
			}
		}

		if (!method) throw new Error()
		return method.apply(this, [...arguments])
	}
}

class Greeter5 {
	greeting: string

	constructor(message: string) {
		this.greeting = message
	}

	@Validate
	greet(@Required name?: string) {
		return 'Hello ' + name + ', ' + this.greeting
	}
}

const greeter = new Greeter5('how are you?')

// Throws an error if we make name optional and omit it
assert.throws(() => greeter.greet())
assert.ok(greeter.greet('Ivan'))
export {}
