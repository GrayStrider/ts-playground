import { Option, isNone, none, some } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

//==========================================================
// How can we compose two generic functions
// f: (a: A) => B and g: (c: C) => D?
//==========================================================

/*
 * Why finding solutions to this problem is so important?
 
 Because if categories can be used to model programmming languages,
 * morphisms (i.e. functions in TS) can be used to model programs.
 
 Therefore solving the problem also means to find how to compose
 * programs in a general way. And this is pretty interesting
 * for a developer, isn't it?
 * */

//==========================================================
// Functions as programs
//==========================================================

/*
 * We call *pure program* a function with the following signature
 | (a: A) => B
 *
 Such a signature models a program which accepts an input of
 * type A and yields a result of type B, without any effect.
 
 We call *effectful program* a function with the following signature
 | (a: A) => F<B>
 *
 Such a signature models a program which accepts an input of
 * type A and yields a result of type B, along with an effect F,
 * where F is some type constructor.
 *
 * Recall that a type constructor is an n-ary type operator
 * taking as argument zero or more types, and returning another type.
 
 * */

//==========================================================
// Example
//==========================================================

/*
 * Given the concrete type string, the Array type constructor
 * returns the concrete type Array<string>
 
 Here we are interested in n-ary type constructors with n >= 1, for example
 *
 ┌──────────────────┬─────────────────────────────────┐
 │ Type constructor │     Effect (interpretation)     │
 ├──────────────────┼─────────────────────────────────┤
 │ Array<A>         │ a non deterministic computation │
 │ Option<A>        │ a computation that may fail     │
 │ Task<A>          │ an asynchronous computation     │
 └──────────────────┴─────────────────────────────────┘
 
 * */

/*
 * Now back to our main problem:
 How can we compose two generic functions
 * f: (a: A) => B and g: (c: C) => D?
 *
 * Since the general problem is intractable, we need to
 * put some constraint on B and C.
 *
 * We already know that if B = C then the solution
 * is the usual function composition:
 * */
const _compose = <A, B, C>
(
	a: (b_: B) => C,
	b: (a_: A) => B,
): (a1_: A) => C =>
	c => a (b (c))

// What about the other cases?..

//==========================================================
// In which the constraint B = F<C> leads to functors
//==========================================================


/*
 * Let's consider the following constraint:
 * B = F<C> for some type constructor F, or in other words
 
 - f: (a: A) => F<B> is an effectful program
 - g: (b: B) => C is a pure program
 *
 *
 In order to compose f with g we could find a way to lift g from
 * a function (b: B) => C to a function (fb: F<B>) => F<C> so that we
 * can use the usual function composition (the output type of f would be
 * the same as the input type of the lifted function)
 
 So we turned the original problem into another one: can we find such a lift function?
 * */

// Example (F = Array)
const _liftArray = <B, C>
(
	g: (b: B) => C,
): (fb: Array<B>) => Array<C> =>
	fb => fb.map (g)

// Example (F = Option)
const _liftOption = <B, C>
(
	g: (b: B) => C,
): (fb: Option<B>) => Option<C> =>
	fb => isNone (fb)
		? none
		: some (g (fb.value))

// Example (F = Task)
const _liftTask = <B, C>
(
	g: (b: B) => C,
): (fb: Task<B>) => Task<C> =>
	fb => () => fb ().then (g)


/*
 * All those lift functions almost look the same.
 * It's not a coincidence, there's a functional pattern under the hood.
 
 Indeed all those type constructors (and many others) admit a
 *
 * *functor instance*.
 * */


//==========================================================
// Functors
//==========================================================
