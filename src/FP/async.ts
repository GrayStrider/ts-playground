import { tryCatch } from 'fp-ts/lib/TaskEither'
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { attemptP, map, mapRej, fork } from 'fluture'
import { future } from 'fp-ts-fluture/lib/Future'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'
import { fold } from 'fp-ts/lib/Either'

function get (url: string) {
	return tryCatch<AxiosError, AxiosResponse> (
		() => axios.get (url),
		res => res as AxiosError,
	) ()
}

export const getF = (url: string, config?: AxiosRequestConfig) =>
	attemptP (() => axios.get (url, config))

const logF = fork (console.log) (console.log)

const getF3 = (url: string) =>
	future.fromTask <AxiosError, AxiosResponse> (() => axios.get (url))
		.pipe (map (flow (prop ('data'), JSON.stringify, x => x.length)))
		.pipe (mapRej (({ code, message }) => code ?? message))

get ('https://hello.coms').then (fold (
	({ code, message }) => console.log (code ?? message),
	console.log,
))

getF3 ('https://hello.codm').pipe (logF)
