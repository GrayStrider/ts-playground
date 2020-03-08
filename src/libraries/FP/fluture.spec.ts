import { resolve, fork, attemptP } from 'fluture'
import sanctuary, { env } from 'sanctuary'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import { sig } from '@strider/utils-ts'

const log = (title: string) => (data: any) => sig.info(`[${title}]: ${data}`)

it('should invoke resolver', async () => {
	expect.assertions(2)

	const [rej, res] = [jest.fn(), jest.fn()]
	fork(rej)(res)(resolve(true))
	expect(rej).not.toHaveBeenCalled()
	expect(res).toHaveBeenCalledWith(true)
})

describe('with promises', () => {
	const rejects = () => new Promise((res, rej) => rej('fail'))

	it('should rejected promise', done => {
		expect.assertions(1)

		const res1 = rejects().catch(r => {
			expect(r).toStrictEqual('fail')
			done()
		})
	})

	it('should do the thing', done => {
		expect.assertions(1)

		attemptP(rejects).pipe(
			fork(error => {
				expect(error).toStrictEqual('fail')
				done()
			})(res => {
				expect(res).toStrictEqual('')
				done()
			})
		)
	})
})

describe('with sanctury', () => {
	const S = sanctuary.create({ checkTypes: true, env: env.concat(flutureEnv) })

	it('sanctuary', async () => {
		fork(log('rejection'))(log('resolve'))(S.I(resolve(42)))
	})
})
