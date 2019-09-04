interface x1 {
  optional?: string
  readonly readonly: boolean
  readonly arr: number[]
  nestedObj: {
    [index: string]: number
    /* type: string can't use, because not assignable to indexed type*/,
    type: number
    hardcoded: 10
  }
  method(): 'hi'
  // [anyOtherValue: string]: any;
}

let obj: x1 = {
  method:    () => 'hi',
  nestedObj: {
    hardcoded: 10,
    type:      3,
    'one':     1,
    'two':     2,
    'three':   3,
    'four':    4
  },
  arr:       [1],
  readonly:  false,
  optional:  'optional'
  // another: false
}
// functions in JS can not return nothing, use undefined
type returnsVoid = (...args: number[]) => void

interface IReturnsVoid {
  (...args: number[]): void
}

const foo: returnsVoid /* IReturnsVoid */ = (...args) => {
  console.log(args)
  return 0
}
foo(3, 4, 5)

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface; // constructor interface
}

interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
const Clock: ClockConstructor = class Clock implements ClockInterface { // class expressions
  constructor(h: number, m: number) {
  }

  tick() {
    console.log('beep beep')
  }
}

enum Colors {
  black, blue
}

interface Shape {
  color: Colors;
}

interface Square extends Shape {
  readonly sideLength: number;
}

let square: Square = { color: Colors.black, sideLength: 10 }
square.color = Colors.blue


// object that acts as both a function and an object


class Counter {
  private timeElapsed = 0
  private interval: number = 5

  constructor(startFrom: number) {

  }

  reset() {
    this.timeElapsed = 0
  }

  start(startFrom = 0) {
    // ...
  }
}

class Control {
  private state: any
}

interface SelectableControl extends Control { // interface extending class
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}


// interface ILabelledValue {
//     label: string;
// }
// function printLabel(labelledObj: ILabelledValue /* equivalent to { label: string } */) {
//     console.log(labelledObj.label);
// }
// let myObj = {size: 10, label: "Size 10 Object"};
// // printLabel(myObj); // won't let create label with non-string type

// TODO why "implement interface" explicitly

interface ISquareDefault {
  color?: string;
  width?: number;
}

interface ISquareWithArea extends ISquareDefault {
  area?: number;
}

// function createSquareWithArea(config: ISquareWithArea) /*: {area: number} }*/ {
//     // could use this piece here instead of extending interface
//     const newSquare = {color: "white", area: 100};
//     if (config.color) {
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }

class SquareDefault {
  public color = 'white';
  public width = 10;

  constructor(config: ISquareDefault) {
    if (config.color) {
      this.color = config.color;
    }
    if (config.width) {
      this.width = config.width;
    }
  }

  // public getWidth() {
  //     return this.width;
  // }
}

class SquareWithArea extends SquareDefault {
  private readonly area: number;

  constructor(config: ISquareWithArea) {
    super(config);
    if (config.area) {
      this.area = config.area;
      this.width = config.area / 2;
    }

    this.area = this.width * 2
  }

  public getArea() {
    return this.area;
  }
}

// const mySquare = createSquareWithArea({color: 'black'});
// // printProps(mySquare);
// // [color]: black
// // [area]: 100

// const mySquare2 = createSquareWithArea({width: 15});
// // printProps(mySquare2);
// // [color]: white
// // [area]: 225 // square itself doesn't have 'width' property, but 'area'
// // property updates accordingly.

const mySquare3 = new SquareWithArea({area: 500});
console.log(mySquare3);
console.log(`area: ${mySquare3.getArea()}`);
printProps(mySquare3);

const mySquare4 = new SquareDefault({});
printProps(mySquare4);

function printProps(object: object) {
  // will display private class variables because of string literal usage in log.
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      console.log(`[${prop}]: ${object[prop]}`);
    }
  }
  console.log('');
}


type ISearchFunc = (source: string, subString: string) => boolean;

const mySearch: ISearchFunc = (src, sub) => {
  const result = src.search(sub);
  return result > -1;
};

console.log(mySearch('test234test', '34')); // true
console.log(mySearch('test', '3')); // false


type IStringArrayRO = readonly string[]

let myArray: IStringArrayRO = ["Bob", "Fred"];

console.log(myArray[0]);
// myArray[0] = 'test'; // error! read-only!
