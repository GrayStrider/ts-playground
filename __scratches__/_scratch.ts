export = {} // fix 'cannot redeclare block-scoped variable'
/**
 * USE LIVE TEMPLATES / POSTFIX / PLOP
 */


class Test {
  constructor(private _param: string) {

  }

  get param(): string {
    return this._param + ' can modify!'
  }

  set param(value: string) {
    this._param = value
  }

}

interface SumParameters {
  a: number
  b: number
}

const sum = ({ a, b }: SumParameters) => a + b

sum({ a: 1, b: 3 }) /*?. 'value: ' + $*/

/**
 * Word this abstinence quintessential
 */
const abstinence = 'quintessential'

const test = new Test('test')
test.param //?
test.param = 'new2'
test.param //? $.length

const obj1 = {a: 1, b: 'test'}
const obj2 = {a: 123, b: 'test45'}
