export default {}
const file = 'text.txt'


/**
 * - destructuring
 * global match (/g) will return only full matches
 * without capture groups!
 */
const [, name, extension] = file.match(/(^.*)(\..*)/i) //?
const parseProtocol = url => {
  const parsedURL = /^(\w+):\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  const [, protocol, fullhost, fullpath] = parsedURL;
  return [protocol, fullhost, fullpath];
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

const concat = obj
  .reduce((acc, curr) => acc + curr.data, '')
console.log(concat)

const arr = obj
  .filter(item => !/\d/.test(item.data))
  .map(item => item.data)
  .join('-')
console.log(arr)

