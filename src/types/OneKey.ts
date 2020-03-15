import { chance } from '@strider/utils-ts'

/**
 * type Keys = 'foo' | 'bar'
 *
 * const obj0: { [key in Keys]: any } = { foo: 'ok', bar: 'ok!' }
 *
 * const obj: OneKey<Keys> = { foo: 'ok' }
 *
 * // const obj2: OneKey<Keys> = {foo: 'ok', bar: 'not allowed!'}
 *
 */
type OneKey<K extends string, V = any> = {
	[P in K]: (Record<P, V> &
		Partial<Record<Exclude<K, P>, never>>) extends infer O
		? { [Q in keyof O]: O[Q] }
		: never
}[K]


export default OneKey
