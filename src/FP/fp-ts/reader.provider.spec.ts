import { Reader } from 'fp-ts/lib/Reader'

type Provider<R> = <A>(r: Reader<R, A>) => A

type Name = string
type Age = number

type Customer = {
	name: Name,
	age: Age,
}

const john: Provider<Customer> = (r) => r ({
	name: 'John Doe',
	age: 42,
})

const getAge: Reader<Customer, Age> = ({ age }) => age

it ('should get age', async () => {
	expect.assertions(1)
  const act = john (getAge)
  const exp = 42
  expect (act).toStrictEqual(exp)
})
