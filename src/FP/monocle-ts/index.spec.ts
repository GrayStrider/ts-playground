import { Lens } from 'monocle-ts'
import { isSE } from '@strider/utils-ts'
import { cloneDeep } from 'lodash'


interface Street {
	num: number
	name: string
}

interface Address {
	city: string
	street: Street
}

interface Company {
	name: string
	address: Address
}

interface Employee {
	name: string
	company: Company
}

const employee: Employee = {
	name: 'john',
	company: {
		name: 'awesome inc',
		address: {
			city: 'london',
			street: {
				num: 23,
				name: 'high street'
			}
		}
	}
}


const capitalize = (s: string): string => s.substring (0, 1).toUpperCase () + s.substring (1)

const actSpread = {
	...employee,
	company: {
		...employee.company,
		address: {
			...employee.company.address,
			street: {
				...employee.company.address.street,
				name: capitalize (employee.company.address.street.name)
			}
		}
	}
}

const expSpread: Employee = {
	'company': {
		'address': {
			'city': 'london',
			'street': {
				'name': 'High street',
				'num': 23
			}
		},
		'name': 'awesome inc'
	},
	'name': 'john'
}

it ('should capitalize', async () => {
	expect.assertions (1)
	isSE (actSpread, expSpread)
})


const company = Lens.fromProp<Employee> () ('company')
const address = Lens.fromProp<Company> () ('address')
const street = Lens.fromProp<Address> () ('street')
const name = Lens.fromProp<Street> () ('name')

const capitalizeEmployee = company
	.compose (address)
	.compose (street)
	.compose (name)
	.modify (capitalize)

it ('should be capitalized', async () => {
	expect.assertions (1)
	const act = capitalizeEmployee(employee)
	isSE(act, expSpread)
	
})


it ('should use fromPath API', async () => {
	expect.assertions(1)
	const name = Lens.fromPath<Employee>()
	(['company', 'address', 'street', 'name'])
	const act = name.modify(capitalize)(employee)
	isSE(act, expSpread)
	
})
