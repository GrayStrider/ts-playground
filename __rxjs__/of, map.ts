import { awaitExpression } from '@babel/types'
import { of, from, interval, timer } from 'rxjs'
import { endWith, filter, map, take } from 'rxjs/operators'

map((x: number) => x * x)(of(1, 2, 3))
// .subscribe((v) => console.log(`value: ${v}`));

from([...Array(10).keys()]).pipe(
  filter(x => x !== 3)
)
// .subscribe(value => console.log(value));

interval(500)
  .pipe(
    filter(value => value % 2 === 0)
  )
// .subscribe(value => console.log(value));


interval(1000)
// .subscribe(value => console.log(value))


timer(0, 1000)
  .pipe(
    take(5)
  )
// .subscribe((value => console.log(value)))

const timer_ = ({ numIntervals = 1, interval = 1000 }) => timer(0, interval)
  .pipe(
    take(numIntervals),
    map(value => numIntervals - value - 1),
    endWith('Done.')
  )
  .subscribe(value => process.stdout.write(`\r${value}`))

const newTimer = timer_({ numIntervals: 500, interval: 50 }) //low update rate
