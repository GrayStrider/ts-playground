export default {}

interface Person {
  readonly name: string
  age: number
  gender: 'male' | 'female'
  occupation: string
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

const person: Person = { age: 65, name: 'Sam', gender: 'male', occupation: 'Unemployed' }

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

let [first, second, defaultValue = 3] = [1, 2]
const [firstName, surname] = 'Ilya Kantor'.split(' ')
console.log(first, second, defaultValue)
console.log(firstName, surname);

[first, second] = [second, first]// has to be prefixed by a semicolon
console.log(first, second)

const array = [4, 5];
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

/**
 * as const assention
 *
 * - no literal types in that expression should be widened (e.g. no going from "hello" to string)
 * - object literals get readonly properties
 * - array literals become readonly tuples
 */
const readonlyAsConst = [1, false, 'str'] as const
const string = <const>'test' // same
console.log(readonly, readonly2, readonlyAsConst)
// Works with no types referenced or declared.
// We only needed a single const assertion.
const getShapes = () => ([
  { kind: 'circle', radius: 100 },
  { kind: 'square', sideLength: 50 }
] as const)

for (const shape of getShapes()) {
  // Narrows perfectly!
  if (shape.kind === 'circle') {
    console.log('Circle radius', shape.radius)
  } else {
    console.log('Square side length', shape.sideLength)
  }
}


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
// console.log(what === size)

/**
 * use in these cases instead of ternary
 * @param arg
 */
const takesOptional = (arg?: string) =>
  arg || 'no argument'

console.log(
  takesOptional(),
  takesOptional(', logical or!')
)


/**
 * recursion
 * @param department
 */
let company = { // the same object, compressed for brevity
  sales:       [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 600 }],
  development: {
    sites:     [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
    internals: [{ name: 'Jack', salary: 1300 }]
  }
}

function sumSalaries(department: object) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0) // sum the array
  } else { // case (2)
    let sum = 0
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep) // recursively call for subdepartments, sum the results
    }
    return sum
  }
}

console.log(sumSalaries(company))

/**
 * Linked List
 * could be extended with "previous" property
 */
interface LinkedList {
  value: unknown,
  next?: LinkedList
}

let list: LinkedList = { value: 1 }
list.next = { value: 2 }
list.next.next = { value: 3 }
list.next.next.next = { value: 4 }

// split in two
let secondList = list.next.next
console.log(secondList)

// join back
list.next.next = secondList
console.log(JSON.stringify(
  list, null, 1
))

// prepend a value to the list
list = { value: 'new item', next: list }
console.log(list)

list = { next: list, value: 'newitem' }

const another = { list: list }
const oneMore = { list: list }
