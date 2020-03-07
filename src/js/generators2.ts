import { rx, l, rd, r, o } from '@strider/utils-ts'


// const list = R.range(0, Number.POSITIVE_INFINITY)
// console.log(R.identity(list)) // bad idea lol

// works fine

rx.range(1, Number.POSITIVE_INFINITY)
	.pipe(
		o.filter((value, index) => !!(index % 2)),
		o.map(value => ++value),
		o.take(20),
		o.filter(value => !/5/.test(String(value))),
		o.toArray(),
	)
	.subscribe(console.log)
r.identity(false)
rd.toArray(r.range(10))
const debounce = l.debounce(r.identity)

export {}
