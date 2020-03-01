import {rx, l, RA, R, o} from '@strider/utils-ts'

// const list = R.range(0, Number.POSITIVE_INFINITY)
// console.log(R.identity(list)) // bad idea lol

// works fine

rx.range(1, Number.POSITIVE_INFINITY).pipe(
	o.filter((value, index) => !!(index % 2)),
	o.map(value => ++value),
	o.take(50),
	o.filter(value => !/5/.test(String(value))),
	o.toArray(),
	)
	.subscribe(console.log)
R.identity(false)
RA.toArray(R.range(10))
const debounce = l.debounce(R.identity)

export {}
