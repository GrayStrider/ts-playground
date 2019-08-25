import { pickBy } from 'lodash'

const object = {
  x:   42,
  y:   50,
  abc: 9001
}

const result = Object.fromEntries(
  Object.entries(object)
        .filter(([key, value]) => key.length === 1)
)

const result2 =
  pickBy(object, (value, key) => key.length === 1)

console.log(result2, result)
