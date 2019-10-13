export {}

type NonEmptyArray<T> = [T, ...T[]]; // "one T +  0 or more of T"

/** ! WORKS AT RUNTIME ! */
const isNonEmptyArray =
  <T>(arr: T[]):
    arr is NonEmptyArray<T> =>
    arr.length > 0

const arr: NonEmptyArray<string | number> =
  ['string', 0]
console.log(
  isNonEmptyArray(['', 1]),
  isNonEmptyArray([]),
  isNonEmptyArray(arr)
)
