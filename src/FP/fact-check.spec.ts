import * as fc from 'fast-check'
import { sig } from '@strider/utils-ts'

it ('should generate stats', async () => {
	fc.statistics (
		fc.nat (),    // arbitrary or property to extract the values from
		n => n % 2 === 0 ? 'Even number' : 'Odd number', // classifier
		10000,        // number of values to extract
	)
	
	const sample = fc.sample(
		fc.anything(), // arbitrary or property to extract the values from
		10             // number of values to extract
	)
	sig.success(sample)
})
