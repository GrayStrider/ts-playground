/*
 * The purpose of the Reader monad is to avoid threading arguments through multiple functions in order to only get them where they are needed.
 
 One of the ideas presented here is to use the Reader monad for dependency injection.
 
 The first thing you need to know is that the type Reader<R, A> represents a function (r: R) => A
 */

import { Reader, chain, ask } from 'fp-ts/lib/Reader'
import { pipe } from 'fp-ts/lib/pipeable'

interface _Reader<R, A> {
	(r: R): A
}

/*
 * where R represents an "environment" needed for the computation (we can "read" from it) and A is the result.
 *
 * Example
 Let's say we have the following piece of code
 * */

const f = (b: boolean): string => (b ? 'true' : 'false')

const g = (n: number): string => f (n > 2)

const h = (s: string): string => g (s.length + 1)

it ('should pass', async () => {
	expect.assertions (1)
	expect (h ('foo')).toStrictEqual ('true')
})

/*
 * What if we want to internationalise f? Well, we could add an additional parameter
 * */

interface Dependencies {
	i18n: {
		true: string
		false: string
	}
}

const f_i = (b: boolean, deps: Dependencies): string =>
	(b ? deps.i18n.true : deps.i18n.false)

// Now we have a problem though, g doesn't compile anymore
const g_ = (n: number): string => f (n > 2) // error: An argument for 'deps' was not provided
// We must add an additional parameter to g as well
const g_1 = (n: number, deps: Dependencies): string => f_i (n > 2, deps) // ok
// We haven't finished yet, now it's h that doesn't compile, we must add an additional parameter to h as well
const h_ = (s: string, deps: Dependencies): string => g_1 (s.length + 1, deps)
// finally we can run h by providing an actual instance of the Dependencies interface
const instance: Dependencies = {
	i18n: {
		true: 'vero',
		false: 'falso',
	},
}

it ('should translate', async () => {
	expect.assertions (1)
	const act = h_ ('foo', instance)
	const exp = 'vero'
	expect (act).toStrictEqual (exp)
})

/*
 * As you can see, h and g must have knowledge about f dependencies despite not using them.
 
 Can we improve this part? Yes we can, we can move Dependencies from the parameter list to the return type.
 * */

//==========================================================
// Reader
//==========================================================

// Let's start by rewriting our functions, putting the deps parameter alone
// Note that (deps: Dependencies) => string is just Reader<Dependencies, string>

const f_R = (b: boolean): Reader<Dependencies, string> =>
	deps => (b ? deps.i18n.true : deps.i18n.false)

const g_R = (n: number): Reader<Dependencies, string> => f_R (n > 2)

const h_R = (s: string): Reader<Dependencies, string> => g_R (s.length + 1)

it ('should translate', async () => {
	expect.assertions (1)
	const act = h_R ('foo') (instance)
	const exp = 'vero'
	expect (act).toStrictEqual (exp)
})

//==========================================================
// Ask
//==========================================================

/*
 * What if we want to also inject the lower bound (2 in our example) in g? Let's add a new field to Dependencies first
 * */

export interface Dependencies_ {
	i18n: {
		true: string
		false: string
	}
	lowerBound: number
}

const instance_: Dependencies_ = {
	i18n: {
		true: 'vero',
		false: 'falso',
	},
	lowerBound: 2,
}

const getBool = (b: boolean): Reader<Dependencies_, string> =>
	deps => (b ? deps.i18n.true : deps.i18n.false)

const checkLB = (n: number): Reader<Dependencies_, string> => pipe (
	ask<Dependencies_> (),
	chain (deps => getBool (n > deps.lowerBound)),
)

const validateLen = (s: string): Reader<Dependencies_, string> =>
	checkLB (s.length + 1)

it ('should translate', async () => {
	expect.assertions (1)
	const act = validateLen ('foo') (instance_)
	const exp = 'vero'
	expect (act).toStrictEqual (exp)
})

it ('should check lower bound', async () => {
	expect.assertions(1)
  const act = validateLen('foo')({ ...instance, lowerBound: 4 })
  const exp = 'falso'
  expect (act).toStrictEqual(exp)
})
