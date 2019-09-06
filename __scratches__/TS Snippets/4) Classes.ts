class Greeter3 {
  private readonly greeting: string // private member, readonly
  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter3('world')

// Inheritance
abstract class Animal { // cannot be instantiated directly
  protected owner: string // cannot be accessed externaly

  protected constructor(private readonly name: string) {
    this.owner = 'None!'
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters.toPrecision(4)}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name) }

  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name) }

  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }

  setOwner(newOwner: string) {this.owner = newOwner}
}

let sam = new Snake('Sammy the Python')

let tom: Animal = new Horse('Tommy the Palomino')
sam.move()

tom.move(34)
// In TypeScript, each member is public by default
module Chameleon {
  type color = 'green' | 'black'

  export class Chameleon {
    newColor: color

    constructor({ newColor = 'green' }: { newColor?: color } = {}) {
      this.newColor = newColor
    }

    colorChange(newColor: color) {
      this.newColor = newColor
      return this.newColor
    }
  }
}

import MyChameleon = Chameleon.Chameleon

const cham = new MyChameleon()
console.log(cham)
cham.colorChange('black')
console.log(cham)

//================================================================================
// Song duration
//================================================================================


class Song {
  constructor(public title: string, public duration: string | number) {}
}

function getSongDuration(item: Song) {
  if (typeof item.duration === 'string') {
    return item.duration
  }
  const { duration } = item
  const minutes = Math.floor(duration / 60000)
  const seconds = (duration / 1000) % 60
  return `${minutes}:${seconds}`
}

const songDurationFromString = getSongDuration(
  new Song('Wonderful Wonderful', '05:31')
)
console.log(songDurationFromString)


const songDurationFromMS = getSongDuration(
  new Song('Wonderful Wonderful', 330000)
)
console.log(songDurationFromMS)
