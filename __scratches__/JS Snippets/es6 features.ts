const drawES2015Chart = ({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) => {
  console.log(size, coords, radius)
  // do some chart drawing
}

drawES2015Chart({
  coords: { x: 18, y: 30 },
  radius: 30
})
drawES2015Chart() // thanks to = {} assignment, call without args is possible


const props = [
  { id: 1, name: 'Fizz' },
  { id: 2, name: 'Buzz' },
  { id: 3, name: 'FizzBuzz' }
]
const [, , { name }] = props
console.log(name) // combine array and object destructuring

const str = 'abc'
console.log([...str]) // since string is an Iterable

// generator expressions
function* generator(num: number) {
  yield num
  yield num * 2
  return `Done! ${num + 5}`
}

for (let generatorElement of generator(10)) {
  console.log(generatorElement)
}
const gen = generator(10)
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

function* range(start: number, upperLimit: number) {
  while (start < upperLimit + 1)
    yield start++
}

console.log(
  [...range(1, 10)])

const range2 = (length: number) =>
  [...Array(length).keys()]
console.log(
  range2(10))

export default {}
