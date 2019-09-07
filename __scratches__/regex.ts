export default {}

const file = 'text.txt'


/**
 * - destructuring
 * global match (/g) will return only full matches
 * without capture groups!
 */
const [, name, extension] = file.match(/(^.*)(\..*)/i) //?
const parseProtocol = url => {
  const parsedURL = /^(\w+):\/\/([^\/]+)\/(.*)$/.exec(url)
  if (!parsedURL) {
    return false
  }
  const [, protocol, fullhost, fullpath] = parsedURL
  return [protocol, fullhost, fullpath]
}

/**
 * filter out numbers;
 * test
 */
const obj: { data: string }[] = [
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test2' }
]

console.log(obj
  .reduce((acc, curr) => acc + curr.data, ''))

console.log(obj
  .filter(item => !/\d/.test(item.data))
  .map(item => item.data)
  .join('-'))


const test = '12weord test'
// Non-capture group:
test.match(/(?:\d+)(\w+)/) //?
// Positive lookahead: (one or more \d, followed by one or more \w)
test.match(/(\d+)(?=\w+)/) /*?*/
// Negative lookahead: matches only 1 digit, otherwise would had to return null (pattern shouldn't match)
test.match(/(\d+)(?![a-z]+)/) /*?*/
// Positive lookbehind: does not create a group; must have a fixed width!
test.match(/(?<=\d{2})(\w*)/) /*?*/
// Negative lookbehind: only foo that is not being preceded by 'not '; must have fixed width!
const foo = 'not foo but foo'
foo.match(/(?<!not )foo/) //?
test.match(/(?<!\d{2})[a-z]+/gi) //?
// only matches the one with gidits; can't figure out how to reverse
test.match(/(\d+)[a-z]+/gi) //?

const regExp = /(?<=Strider)(🐌)/gi
regExp.test('Strider🐌') //?

'Stride4r🐌'.match(regExp)


/**
 * using (skip, skip, ..., value) => value replacer (string destructuring)
 * doesn't look very reliable
 *
 * Alternative: second regexp for matching required character/s
 * Notice non-null assertion before [0]
 * (I handle the possible null in return statement)
 *
 * UPDATE:
 * it's not string destructuring, replace actually returns capture groups
 * even with /g. (look ...rest)
 */
const text = 'test_abas_ere_fd_JF'
const regexp = /[_-](.)/gi
const regexpReplacer = /(?<=[_-])(.)/ig

console.log(text
  .replace(regexp,
    (fullMatch, firstGroup, ...rest) =>
      firstGroup.toUpperCase())
)

// console.log(text
//   .replace(regexp,
//     (x) => {
//       console.log(x)
//       const match = x
//         .match(regexpReplacer)![0] //?
//       return match
//              ? match.toUpperCase()
//              : ''
//     }))

/**
 * backreference; no way to modify the value before replacement
 */
console.log(text
  .replace(regexp, '$1')
)

