import nock from 'nock'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { encaseP, promise, map } from 'fluture'
import { prop } from 'fp-ts-ramda'

const faxiosGet = encaseP<AxiosError, AxiosResponse, string>
(axios.get)

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
		expect.assertions(1)
		
		const res = promise (faxiosGet ('fakepath'))
		
		await expect (res).rejects.toMatchObject ({
			code: 'ECONNREFUSED'
		})
	})
	
})
