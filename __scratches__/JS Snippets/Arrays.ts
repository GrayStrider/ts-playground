export default {}
const NUMS: number[] = Array.from(Array(10).keys())
const ARR: string[] = ['one', 'two', 'three']
console.log(ARR.concat('test'))
console.log(ARR.join('-')) // one-two-three
console.log(ARR.push('five'))
console.log(ARR.pop()) // four
console.log(ARR.shift()) // one
console.log(ARR.unshift('one')) // 3, returns length
console.log(ARR.reverse())

/*
every(), some()
 */
const isEven = (num: number) => !(num % 2)
console.log(NUMS)
console.log(NUMS.every(isEven)) // true
console.log(NUMS.some(isEven)) // true
console.log(NUMS.reduce((acc, curr) => acc + curr, 0)) // sum

/**
 * array to object
 */
console.log(
  ARR.reduce((acc, curr, index) =>
    ({...acc, [`[${index}] ` + curr]: curr.length}), {})
)

/**
 * some, find
 */
console.log(ARR.find/*some*/(value => /th/g.test(value)))
