import { fromEvent, interval, OperatorFunction, UnaryFunction } from 'rxjs';
import { audit, auditTime, buffer, filter, tap } from 'rxjs/operators';

/**
 * [audit]
 * display difference in seconds ....
 *
 * throttleTime: emits, then waits
 */
class Difference {
  private prevValue: number | null;

  constructor() {
    this.prevValue = null;
  }

  public getDifference(value) {
    if (!this.prevValue) {
      this.prevValue = value;
      return 0;
    } else {
      const result = value - this.prevValue;
      this.prevValue = value;
      return result;
    }
  }
}

const diff = new Difference();

// sometimes returns 3 instead of 2
interval(1000).pipe(
  audit(ev => interval(2000))
);
// .subscribe(value => console.log(`${value}: ${diff.getDifference(value)}`));

/**
 * auditTIme
 * allow through every n ms
 *
 * throttleTime: emits, then waits
 */
interval(1000).pipe(
  auditTime(1010),
  tap()
);
// .subscribe(value => console.log(value))

/**
 * [Node input]
 * wait for input and console.log it
 */
const input = process.openStdin();
fromEvent(input, 'data');
// .subscribe(value => console.log(value.toString()));

/**
 * buffer: collects values untill param observable emits, then returns collected
 * bufferCount:
 */
interval(200).pipe(
  filter((value: number) => value % 2 === 0),
  buffer(interval(2000))
)
  .subscribe(value => console.log(value));

function foo(pair: readonly [string, string]) {
  console.log(pair[0]);   // okay
  // pair[1] = "hello!";     // error
}
