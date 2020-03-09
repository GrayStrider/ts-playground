import { Task } from 'fp-ts/lib/Task'
import { createInterface } from 'readline'
import { pipe } from 'fp-ts/lib/pipeable'
import { toUpper } from 'src/FP/ramda'
import { sig } from '@strider/utils-ts'

const read: Task<string> = () =>
	new Promise<string> (resolve => {
		const rl = createInterface ({
			input: process.stdin,
			output: process.stdout,
		})
		rl.question ('Type here: ', answer => {
			rl.close ()
			resolve (answer)
		})
	})

read()
	.then(pipe(toUpper))
	.then(sig.success)
