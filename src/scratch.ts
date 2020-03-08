import axios from 'axios'
import Future, { RejectFunction, ResolveFunction } from 'fluture'

// TODO doesn't work
function myEncase<Rej, Res, T extends (...args: any[]) => Promise<any>>
(func: T, ...args: Parameters<typeof axios.get>) {
	
	return Future (<Rej, Res>
	(reject: RejectFunction<Rej>, resolve: ResolveFunction<Res>) => {
		func (...args)
			.then (resolve)
			.catch (reject)
		return () => {}
	})
}
