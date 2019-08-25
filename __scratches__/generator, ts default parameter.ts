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
