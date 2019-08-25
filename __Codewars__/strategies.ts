enum operations {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/'
}

function basicOp(operation: operations, value1: number, value2: number) {
  const strategies = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b
  }

  return strategies[operation](value1, value2)
}

console.log(basicOp(operations.MULTIPLY, 2, 3))
console.log(basicOp(operations.PLUS, 2, 3))
