import { type } from 'os'

export default {}

interface Person {
  readonly name: string
  age: number
  gender: 'male' | 'female'
}

interface Options {
  size: { width: number; height: number }
  extra: boolean
  items: string[]
}

/**
 * cycles
 */
// while (true) {
// }
//
// do {} while (true)


for (let i = 0; i < 10; i++) {
  console.log(i)
}

// switch (true) {
//   case true: {
//
//   }
//   break
// }

/**
 * Applying the principle of least privilege,
 * all declarations other than those you plan to modify should use const.
 */

const person: Person = { age: 65, name: 'Sam', gender: 'male' }

/**
 * in / !!
 * spread clone
 * destructuring,
 * default value (cannot use for objects!),
 * object destructuring,
 * renaming,
 * ...rest,
 * readonly / as const,
 * swapping variables,
 * passthrough destructuring (removes methods!)
 */

console.log('age' in person)
console.log(!!person.age)

console.log({ ...person, propAdded: 2 })

const array = [4, 5]
let [first, second, defaultValue = 3] = [1, 2]
const [firstName, surname] = 'Ilya Kantor'.split(' ')
console.log(first, second, defaultValue)
console.log(firstName, surname);

[first, second] = [second, first]// has to be prefixed by a semicolon
console.log(first, second);

[first, second] = array // same
console.log(first, second)

let { name, age, gender: genderName } = person // object desctructuring, new variable names
console.log(genderName, name, age);

({ age } = { age: 40 }) // overwrite; have to use brackes and semicolon
console.log(age)

let { name: Name, ...rest } = person
console.log(Name, rest.gender.length, rest.age + 'y/o')

const readonly: readonly number[] = [1, 2, 3]
const readonly2: readonly [number, number, boolean] = [1, 2, false]
// compare types with:
const readonlyAsConst = [1, false, 'str'] as const
console.log(readonly, readonly2, readonlyAsConst)


/**
 * nested destructuring
 */
let options: Options = {
  size:  {
    width:  100,
    height: 200
  },
  items: ['Cake', 'Donut'],
  extra: true
}

let {
  size:  {
           width,
           height
         },
  items: [item1, item2]
  // title = 'Menu' // not present in the object (default value is used); works, but not allowed for objects
} = options
console.log(width, height, item1, item2)


/**
 * complex function destructuring
 * types could use some work
 */
interface MenuOptions {
  title?: string
  width?: number
  height?: number
  items?: string[]
}

const showMenu = ({
                    title = 'Untitled',
                    width:  w = 100,  // width goes to w
                    height: h = 200, // height goes to h
                    items:  [item1, item2] = ['default1', 'default2']
                  }: MenuOptions = {}) => {

  console.log(title, w, h, item2, item1)
}

const callOptions: MenuOptions = {
  title: 'My menu',
  items: ['Item1', 'Item2']
}

showMenu(callOptions)
showMenu({})

/**
 * my assumption is size gets assigned and then returts options,
 * so what can get assigned to it
 */
let size
let what = ({ size } = options)
console.log(what)
console.log(size)

console.log(what === options)
console.log(what === size)
