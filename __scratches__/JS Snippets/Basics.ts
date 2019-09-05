import { ping } from 'app/actions/pingPong'

export default {}

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

const object = { a: 1}
console.log('a' in object)
console.log(!!object.a)

console.log({...object, b: 2}) // clone
