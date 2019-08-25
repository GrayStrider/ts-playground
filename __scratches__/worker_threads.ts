import { from, iif, interval, of, timer } from 'rxjs'
import { fromArray } from 'rxjs/internal/observable/fromArray'
import { concatMap, delay, mergeMap, scan, take } from 'rxjs/operators'

const count = interval(500)
const arr = ['one', 'two', 'three', 'four']
// count.subscribe(value => process.stdout.write(`\r${value}`));
fromArray(arr).pipe(
  scan((acc, value) => value)
)
// .subscribe(value => console.log(value));

interval(1000)
  .pipe(
    mergeMap(v =>
      iif(
        () => !!(v % 2),
        of(v)
        // if not supplied defaults to EMPTY
      )
    )
    // output: 1,3,5...
  )
// .subscribe(console.log);

const myArray = [1, 2, 3, 4]

// .subscribe(timedItem => console.log(timedItem));
from(myArray).pipe(
  concatMap(item => of(item)
    .pipe(delay(1000)))
)

// of('dummy', 'test', 'test2').pipe(delay(5000)).subscribe(value => console.log(value))
from(arr).pipe(
  delay(2000)
)
// .subscribe(value => console.log(value))

const y = interval(200)

const source = timer(1000).pipe(

)
//output: [1, 2, 3]
// const subscribe = source.subscribe(val => console.log(val));

const array = [1, 2, 3, 4, 5]

interval(1000)
  .pipe(
    take(array.length)
    // map(i => array[i])
  )
  .subscribe(console.log)

