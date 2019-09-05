export default {}
/**
 * sleep for x sec
 */
const sleep = m =>
  new Promise(r => setTimeout(r, m))

const asyncText = async (text, time) => {
  console.log('waiting ' + (time / 1000).toFixed(1) + 's..')
  await sleep(time)
  return text
}

asyncText('test', 1000)
  .then(value => console.log(value))
