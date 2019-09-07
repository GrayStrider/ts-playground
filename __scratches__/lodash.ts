import _ from 'lodash'

const object = {
  x:   42,
  y:   50,
  abc: 9001,
  z:   'test',
  az:  50
}


console.log(
  _.pickBy(object,
    (value, key) =>
      key.length === 1 && typeof value === 'number'),

  Object.fromEntries(
    Object.entries(object)
          .filter(([key, value]) =>
            key.length === 1 && typeof value === 'number')
  ))

console.log(_(object)
  .pickBy((value, key) =>
    value === 50 && key.length === 1)
  .value()
)


/**
 * filter returns an array of values matching the predicate
 */
console.log(
  _(object)
    .filter((value) => typeof value === 'number')
    .value()
)

console.log(
  _.filter(object,
    (value) => !!value)
)
