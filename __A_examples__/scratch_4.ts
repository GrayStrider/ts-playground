import { defaultCipherList } from 'constants'

const obj: { data: string }[] = [
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test2' }
]

const concat = obj
  .reduce((acc, curr) => acc + curr.data, '')
console.log(concat)

const arr = obj
  .filter(item => !/\d/.test(item.data))
  .map(item => item.data)
  .join('-')
console.log(arr)

export default {}

