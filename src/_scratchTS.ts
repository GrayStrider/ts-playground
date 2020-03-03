export {}
import axios from 'axios'
import util from 'util'

namespace optionalChaining {
	/** Optional chaining */
	interface Object {
		param: {
			param3: {
				param4: string
			}
			param2: string
		}
		
		[key: string]: unknown
	}
	
	const obj: Object = {
		param: {
			param2: 'test',
			param3: {
				param4: '123',
			},
		},
	}
	
	console.log(obj?.parm)
	console.log(obj?.param)
	
	/** Optional index call */
	function tryGetFirstElement<T>(arr?: T[]) {
		return arr?.[0]
		// equivalent to
		//   return (arr === null || arr === undefined) ?
		//       undefined :
		//       arr[0];
	}
	
	console.log(tryGetFirstElement([1, 2, 3]))
	console.log(tryGetFirstElement([]))
	console.log(tryGetFirstElement())
	
	/** Optional function call */
	async function makeRequest(url: string, log?: (msg: string) => void) {
		log?.(`Request started at ${new Date().toISOString()}`)
		// equivalent to
		//   if (log !== null && log !== undefined) {
		//       log(`Request started at ${new Date().toISOString()}`);
		//   }
		
		const result = await axios.get(url)
		
		log?.(`Request finished at at ${new Date().toISOString()}`)
		
		return result.status
	}
	
	const logger = (msg: string) => console.log(msg)
	const url = 'https://google.com'
	makeRequest(url, logger).then(console.log)
}

namespace nullishCoalescing {
	const hasArgument = (arg: number) => arg ?? /*||*/ false
	console.log(hasArgument(20))
	console.log(hasArgument(0))
}

/** more examples */
console.table({ one: 'one', two: 'two' })

const setTimeoutPromise = util.promisify(setTimeout)

const main = async () => {
	console.log('sleeping')
	await setTimeoutPromise(3000, () => null)
	return 'after sleep'
}

// main()
//   .then(console.log)
//
// for (let i = 1; i <= 100; i++) {
//   const result =
//     (i % 3 === 0) ? 'Foo' :
//     (i % 5 === 0) ? 'Baz' :
//     (i)
//   console.log(result)
// }

function* FooBaz(iterations: number) {
	for (let i = 1; i <= iterations; i++) {
		yield i % 3 === 0 ? 'Foo' : i % 5 === 0 ? 'Baz' : i
	}
}

for (const x of FooBaz(100)) {
	process.stdout.write(String(x))
}
