class Greeter2 {
  greeting: string

  constructor(name: string) {
    this.greeting = name
  }

  @enumerable(true)
  greet() {
    return 'Hello, ' + this.greeting
  }
}

function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
  }
}

const greet = new Greeter2('Ivan')
console.log(greet.greet())
