import { range, zip } from 'rxjs'
import { map, toArray } from 'rxjs/operators'

function FizzBuzz(n = 100) {
	const number = range(1, n)
	const fizz = number.pipe(map(n => (n % 3 === 0 ? 'Fizz' : '')))
	const buzz = number.pipe(map(n => (n % 5 === 0 ? 'Buzz' : '')))
	return zip(number, fizz, buzz).pipe(
		map(([number, fizz, buzz]) => fizz + buzz || number.toString()),
		toArray()
	)
}

FizzBuzz().subscribe(console.log)
