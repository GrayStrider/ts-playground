import util from "util"

const setTimeoutPromise = util.promisify(setTimeout)

it('should resolve after 1s', async () => {
	expect.assertions(1)
	expect(await setTimeoutPromise(1000, true)).toBe(true)
 
}, 1200)
