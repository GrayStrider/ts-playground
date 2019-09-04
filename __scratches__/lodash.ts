import _ from 'lodash'

const object = {
  x:   42,
  y:   50,
  abc: 9001,
  z:   'test',
  az:  50
}


/**
 * pickBy
 */
const result =
  Object.fromEntries(
    Object.entries(object)
          .filter(([key, value]) =>
            key.length === 1 && typeof value === 'number')
  )

const result2 =
  _.pickBy(object, (value, key) =>
    key.length === 1 && typeof value === 'number')

console.log(result2, result)

console.log(_(object)
  .pickBy((value, key) =>
    value === 50 && key.length === 1)
  .value()
)
