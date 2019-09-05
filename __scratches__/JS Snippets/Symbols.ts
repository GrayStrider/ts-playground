import * as _ from 'lodash'
export default {}

/**
 * fibonacci iterator
 */
const fibonacci = {
  [Symbol.iterator]: function*() {
    let a = 1;
    let b = 1;
    let temp;

    yield b;

    while (true) {
      temp = a;
      a = a + b;
      b = temp;
      yield b;
    }
  }
};

// Prints every Fibonacci number less than 100
for (const x of fibonacci) {
  if (x >= 100) {
    break;
  }
  console.log(x);
}

/**
 * symbol identifiers, just for debugging
 */
const symbol1 = Symbol('my symbol');
const symbol2 = Symbol('my symbol');

// symbol1 === symbol2; // false
console.log(symbol1); // 'Symbol(my symbol)'
console.log(symbol2); // 'Symbol(my symbol)'

/**
 * global collection
 */
const symbol3 = Symbol.for('test');
const symbol4 = Symbol.for('test');

// console.log(symbol3 === symbol4) // true, doesn't work

const getClassNameSymbol = Symbol();

class C {
  [getClassNameSymbol](){
    return "C";
  }
}

let c = new C();
let className = c[getClassNameSymbol](); //?
