import jest from 'jest'

declare global {
	namespace jest {
		interface Matchers<R, T> {
			toBeEither (): R
			toBeLeft (): R
			toBeRight (): R
			toEqualLeft (act: any): R
			toEqualRight (act: any): R
			toMatchLeft (act: any): R
			toMatchRight (act: any): R
		}
	}
}
