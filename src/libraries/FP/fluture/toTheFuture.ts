import { attemptP } from 'fluture'

const toTheFuture =
	<Err, Res, T extends (...args: any[]) => Promise<any> = any>
	(func: T) => (...args: Parameters<T>) =>
		attemptP<Err, Res> (() => func (...args))

export default toTheFuture
