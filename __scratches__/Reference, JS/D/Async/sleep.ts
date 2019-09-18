export { sleep }
/**
 * sleep for x sec
 */
const sleep = (time: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, time))

const asyncText = async (text: string, time: number) => {
  console.log('waiting ' + (time / 1000).toFixed(1) + 's..')
  await sleep(time)
  return text
}

asyncText('test', 1000)
  .then(value => console.log(value))
