import nock from 'nock'
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { encaseP, promise, map, fork } from 'fluture'
import { prop } from 'fp-ts-ramda'

const faxiosGet = encaseP<AxiosError, AxiosResponse, string>
(axios.get)

const faxiosGet2 = (url: string) =>
	encaseP ((config?: AxiosRequestConfig) =>
		axios.get (url, config))


describe ('axios', () => {
	const base = 'http://www.example.com',
		path = '/resource', url = base + path
	beforeEach (() => {
		nock (base)
			.get (path)
			.reply (200, 'done')
	})
	
	it ('should fetch the data normally', async () => {
		expect.assertions (1)
		const { data } = await axios.get (url)
		expect (data).toEqual ('done')
	})
	
	it ('should invoke axios', async () => {
		expect.assertions (1)
		
		
		const act = promise (
			faxiosGet (url).pipe (
				map (prop ('data')),
			),
		)
		expect (await act).toStrictEqual ('done')
		
	})
	
	it ('should catch errors', async () => {
		expect.assertions (1)
		
		const res = promise (faxiosGet ('fakepath'))
		
		await expect (res).rejects.toMatchObject ({
			code: 'ECONNREFUSED',
		})
	})
	
	it ('should do with callback', (done) => {
		expect.assertions (1)
		
		fork (done) ((res) => {
			expect (res).toStrictEqual ('done')
			done ()
		}) (faxiosGet (url).pipe (map (prop ('data'))))
		
	})
	
	it ('should do with callback source first', (done) => {
		expect.assertions (1)
		faxiosGet (url)
			.pipe (map (prop ('data')))
			.pipe (fork (done) ((res) => {
				expect (res).toStrictEqual ('done')
				done ()
			}))
	})
	
})
