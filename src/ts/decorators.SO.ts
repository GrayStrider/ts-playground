import 'reflect-metadata'

export function Field(): PropertyDecorator {
	return (target, key) => {
		const fields = Reflect.getOwnMetadata('fields', target) || []
		if (!fields.includes(key)) {
			fields.push(key)
		}
		Reflect.defineMetadata('fields', fields, target)
	}
}

abstract class Form {
	get fields() {
		let fields = []
		let target = Object.getPrototypeOf(this)
		while (target != Object.prototype) {
			let childFields = Reflect.getOwnMetadata('fields', target) || []
			fields.push(...childFields)
			target = Object.getPrototypeOf(target)
		}
		return fields
	}
}

abstract class UserForm extends Form {
	@Field()
	public firstName!: string

	@Field()
	public lastName!: string

	get fullName() {
		return this.firstName + ' ' + this.lastName
	}
}

class AdminForm extends UserForm {
	@Field()
	roles!: string[]
}

const form1 = new AdminForm()
console.log(form1.fields) // ['roles', 'firstName', 'lastName']

class MemberForm extends UserForm {
	@Field()
	memberSince!: Date
}

const form2 = new MemberForm()
console.log(form2.fields) // ["memberSince", "firstName", "lastName"]
