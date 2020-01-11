import axios, { AxiosResponse } from 'axios'
import { from, fromEvent, interval, of, timer } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { auditTime, bufferCount, concatMap, delay, endWith, filter, map, take, tap } from 'rxjs/operators'
import {bb} from '@/utils/libsExport'

//================================================================================
// Helpers
const STR = 'text'

/**
 * returns the difference between previous called value and the next one
 */
class Difference {
	private prevValue: number | null
	
	constructor() {
		this.prevValue = null
	}
	
	/**
	 * sets the value as current if not previously initialised,
	 * otherwise returns the difference
	 * @param value
	 */
	public getDifference(value: number) {
		if (this.prevValue) {
			const result = value - this.prevValue
			this.prevValue = value
			return result
		}
		this.prevValue = value
		return 0
	}
}

const diff = new Difference()
//================================================================================


/**
 * emit each letter after delay
 */
from(STR)
	.pipe(
		concatMap(x => of(x).pipe(
			delay(1000)
		)),
		endWith('Done')
	)
// .subscribe(x => console.log(x))

/**
 * OR bind each value to an interval emit!
 */
interval(300)
	.pipe(
		take(STR.length), // limit emits
		map(i => [...STR][i]), // map each emit to corresponding member
		endWith('Done!')
	)
// .subscribe(console.log)


/**
 * of,
 * filter,
 * map each value
 */
of(1, 2, 3, 4)
	.pipe(
		filter(value => value !== 2),
		map(x => x * x)
	)
// .subscribe(value => console.log(value))

/**
 * start after 1s
 * emit every 0.5s
 * only even
 * take 5
 */
timer /*interval*/(1000, 500)
	.pipe(
		filter(value => !(value % 2)),
		take(5)
	)
// .subscribe(value => console.log(value))
