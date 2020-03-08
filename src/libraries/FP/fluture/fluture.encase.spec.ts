import { attemptP, mapRej, fork } from 'fluture'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { map } from 'fp-ts-fluture/lib/Future'
import { pipe } from 'fp-ts/lib/pipeable'
import { prop } from 'fp-ts-ramda'
import nock from 'nock'

const toTheFuture =
	<Err, Res, T extends (...args: any[]) => Promise<any> = any>
	(func: T) => (...args: Parameters<T>) =>
		attemptP<Err, Res> (() => func (...args))

const axiosF = toTheFuture<AxiosError, AxiosResponse> (axios.get)

const get = (url: string) =>
	axiosF (url, { headers: '' })
		.pipe (map (pipe (prop ('data'))))
		.pipe (mapRej (rej => rej.code ?? 'Error'))

describe ('axios', () => {
	const base = 'http://www.example.com',
		path = '/resource', url = base + path
	beforeEach (() => {
		nock (base)
			.get (path)
			.reply (200, 'done')
	})
	
	test ('passes when request returns data', (done) => {
		expect.assertions (1)
		get (url).pipe (fork
			(done) (res => {
				expect (res).toStrictEqual ('done')
				done ()
			}),
		)
	})
	
	test ('passes when rejects', (done) => {
		expect.assertions (1)
		get ('***').pipe (fork
			(rej => {
				expect (rej).toStrictEqual ('ECONNREFUSED')
				done ()
			}) (done),
		)
	})
})
