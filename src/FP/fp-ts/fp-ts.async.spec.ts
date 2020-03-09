import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import nock from 'nock'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { prop } from 'fp-ts-ramda'


function get (url: string): TaskEither<AxiosError, AxiosResponse> {
	return tryCatch<AxiosError, AxiosResponse> (
		() => axios.get (url).then (prop ('data')),
		res => res as AxiosError,
	)
}

describe ('axios', () => {
	const base = 'http://www.example.com',
		path = '/resource', url = base + path
	beforeEach (() => {
		nock (base)
			.get (path)
			.reply (200, 'done')
	})
	
	test ('passes when axios fetches', async () => {
		expect.assertions (1)
		const res = get (url)
		expect (await res ()).toEqualRight ('done')
	})
	
	test ('passes when axios rejects', async () => {
		expect.assertions (1)
		const res = await get ('***') ()
		// less flexible compared to futures; can't map error
		// since it's already in it's "final form" (Left)
		const err = new Error ('connect ECONNREFUSED 127.0.0.1:80')
		expect (res).toEqualLeft (err)
	})
})
