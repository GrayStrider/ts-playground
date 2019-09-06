const NUM = 1234.123

/**
 * return string!
 * can convert with Number() or +
 * parseInt/float read the number until it can't
 */
console.log(+NUM.toPrecision(5)) // digits total
console.log(+NUM.toFixed(3)) // digits after dot
console.log(parseFloat('120.5 px'))
console.log(parseInt('120.5 px'))
console.log(parseInt('a35'))

console.log(Math.ceil(NUM))
console.log(Math.floor(NUM))
console.log(Math.round(NUM))

console.log(3**3)
console.log(Math.pow(3, 3))

console.log(10 % 4)
/**
 * increment/decrement, postfix/prefix
 */
let counter = 0
console.log(counter++)
console.log(counter)
console.log(++counter)

console.log(counter)

/**
 * NaN
 * isFinite
 */
console.log(NaN === NaN)
console.log(isNaN(NaN))
console.log(isNaN(parseInt('a35')))
console.log(isFinite(Infinity))

console.log(Math.random().toPrecision(1))
