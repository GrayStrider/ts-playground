import { node, chain, encase, map, fork } from 'fluture'
import { readFile } from "fs"
import { prop } from 'fp-ts-ramda'
import ErrnoException = NodeJS.ErrnoException

jest.mock('fs', () => ({
	readFile: jest.fn((args) => 'myfile.txt')
}))

it ('should mock fs', async () => {
	expect.assertions(1)
	
	const cb = () => ''
	readFile('path', cb)
  expect (readFile).toHaveBeenCalledWith('path', cb)
})

it ('should return mock file', async () => {
	expect.assertions(1)
	
	const res = readFile ('', () => '')
	expect (res).toStrictEqual('myfile.txt')
})

describe ('fluture', () => {
	function getPackageName (file: string) {
		return node (done => readFile (file, 'utf8', done))
			.pipe (chain (encase<ErrnoException, { name: string }, any> (JSON.parse)))
			.pipe (map (prop ('name')))
	}
	
})
