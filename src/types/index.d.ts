import Future, { RejectFunction, ResolveFunction, FutureInstance } from 'fluture'

declare module 'fluture' {
	export interface FutureTypeRep {
		then (rej: RejectFunction<T>, res: ResolveFunction<T>): Promise<any>
		hey(): boolean
	}
}
