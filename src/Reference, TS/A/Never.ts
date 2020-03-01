const error = (message: string): never => { // never
  throw new Error(message)  // Function returning never must have unreachable end point
}

const fail = () =>  // Inferred return type is never
  error('Something failed')

const move1 = (direction: 'up' | 'down') => {
  switch (direction) {
    case 'up':
      return 1
    case 'down':
      return -1
  }
  return error('Should never get here')
}

// Inferred return type is number
const move2 = (direction: 'up' | 'down') =>
  direction === 'up' ? 1 :
  direction === 'down' ? -1 :
  error('Should never get here')

// Inferred return type is T
/**
 * returns and calls error? Interesting
 * @param x
 */
const check = <T>(x: T | undefined) =>
  x || error('Undefined value')
const y = undefined
console.log(check(10))

export {}
