import ramda, { T } from 'ramda'

declare module 'ramda' {
	export function length<T>(list: readonly T[] | string): number
}
