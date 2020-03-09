import { myFlow, doubleSay, exclaim, capitalize } from './lodash'

it('should do the thing', () => {
  const cases: [Array<(arg: any) => any>, string][] = [
    [[capitalize, doubleSay, exclaim], 'Hello, Hello!'],
    [[], 'hello'],
    [[exclaim], 'hello!'],
  ]
  for (let [funcs, expected] of cases) {
    expect(myFlow(funcs)('hello')).toBe(expected)
  }
})
