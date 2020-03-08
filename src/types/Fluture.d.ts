import Future, { FutureInstance, ResolveFunction, RejectFunction } from 'fluture'

declare global {
	interface Promise<T> {
		toFuture (rej: RejectFunction<T>, res: ResolveFunction<T>): FutureInstance<T, any>
	}
	
}
