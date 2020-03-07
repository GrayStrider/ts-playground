import { range } from 'rxjs'
import { range as Range } from 'ramda'
import { take, toArray } from 'rxjs/operators'

it('should not overflow', async () => {
	expect.assertions(1)
	const res = range(0, Number.MAX_SAFE_INTEGER).pipe(
		take(10),
		toArray(),
	).toPromise()
	expect(await res).toEqual(Range(0, 10))
})
