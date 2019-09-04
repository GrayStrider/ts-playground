import { oc } from 'ts-optchain'

class Player {
  private _wins: number = 0
  private _active: boolean = false

  constructor(
    private readonly _name: string,
    private readonly _id: string) {
  }

  public get active(): boolean {
    return this._active
  }

  public set active(value: boolean) {
    this._active = value
  }

  public get playerName(): string {
    return this._name
  }

  public get playerID(): string {
    return this._id.toUpperCase()
  }

  public get wins(): number {
    return this._wins
  }
}

const player = new Player('sam', 'qwe')
console.log(player.wins)
console.log(player.playerID)
console.log(player.active)
player.active = true
console.log(player.active)

let data = {passcode: 'secret passcode'}

class Employee {

  constructor(private _fullName: string) {

  }

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (oc(data).passcode() == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee('Bob Smith')
console.log(employee.fullName)
employee.fullName = 'Hi'
console.log(employee.fullName)


/**
 * https://stackoverflow.com/questions/15260732/does-typescript-support-the-operator-and-whats-it-called
 **/
export function o<T>(someObject: T, defaultValue: T = {} as T): T {
  if (typeof someObject === 'undefined' || someObject === null)
    return defaultValue
  else
    return someObject
}
