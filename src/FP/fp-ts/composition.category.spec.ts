import { flow } from 'fp-ts/lib/function'


/*
 * In the last posts we saw some basic abstractions used in functional programming: Eq, Ord, Semigroup and Monoid.
 
 In the next posts we will explore some advanced abstractions that make functional programming even more interesting.
 
 Storically the first advanced abstraction contained in fp-ts is Functor, but before we can talk about functors we need to learn something about categories since functors are built upon them.
 
 A corner stone of functional programming is composition. But what does that exactely mean? When we can say that two things compose? And when we can say that things compose well?
 
 We need a formal definition of composition. That's what categories are all about.
 * */

//==========================================================
// Categories capture the essence of composition.
//==========================================================

/*
 | Part I (Definition)
 * A category is a pair (Objects, Morphisms) where:
 
 Objects is a collection of objects
 Morphisms is a collection of morphisms (or arrows) between the objects
 *
 * Note. The term "object" here has nothing to do with OOP,
 * you can think of objects as black boxes you can't inspect,
 * or even as some kind of ancillary placeholders for morphisms.
 *
 * Each morphism f has a source object A and a target object B
 * where A and B are in Objects.
 *
 * We write f: A ⟼ B, and we say "f is a morphism from A to B".
 */


/*
 * Part II (Composition)
 *
 * There's an operation ∘, named "composition",
 * such that the following properties must hold:
 
 - (composition of morphisms)
 * whenever f: A ⟼ B and g: B ⟼ C are two morphism in Morphisms then it
 * must exist a third morphism g ∘ f: A ⟼ C in Morphisms
 * which is the composition of f and g
 *
 - (associativity)
 * if f: A ⟼ B, g: B ⟼ C and h: C ⟼ D then h ∘ (g ∘ f) = (h ∘ g) ∘ f
 *
 - (identity)
 * for every object X, there exists a morphism identity: X ⟼ X
 * called the identity morphism for X, such that for
 * every morphism f: A ⟼ X and every morphism g: X ⟼ B,
 * we have identity ∘ f = f and g ∘ identity = g.
 */


//==========================================================
// Categories as programming languages
//==========================================================

/*
 * A category can be interpreted as a simplified model of a typed programming language, where:
 
 - objects are types
 - morphisms are functions
 - ∘ is the usual function composition
 
 * */


//==========================================================
// A category for TypeScript
//==========================================================

/*
 * We can define a category, named TS, as a model for the
 * TypeScript language, where:
 
 - objects are all the TypeScript types:
 * string, number, Array<string>, ...
 *
 - morphisms are all the TypeScript functions:
 * (a: A) => B, (b: B) => C, ... where A, B, C, ... are TypeScript types
 *
 - identity morphisms are all encoded as a single polymorphic function:
 */
const _identity = <A> (a: A): A => a
/*
 - composition of morphisms is the usual function composition
 (which is associative)
 
 As a model for TypeScript, TS might seems too limited: no loops, no ifs,
 almost nothing... Nonetheless this simplified model is rich enough
 for our main purpose: reason about a well defined notion of composition.
 * */

//==========================================================
// The central problem with composition
//==========================================================

/*
 * In TS we can compose two generic functions
 * f: (a: A) => B and
 * g: (c: C) => D,  as long as B = C :
 * */

const _compose = <A, B, C>
(
	a: (b_: B) => C,
	b: (a_: A) => B,
): (a1_: A) => C =>
	c => a (b (c))

const a = (a: number) => a > 150 ? 'yes' : 'no'
const b = (a: boolean) => a ? 100 : 200

/**
 * Call b with a_,
 * then return result of calling a with the
 * return value of previos b call
 */
it ('should test compose', async () => {
	expect.assertions (2)
	const c = _compose<boolean, number, 'yes' | 'no'> (a, b)
	
	expect (c (false))
		.toStrictEqual ('yes')
	
	expect (c (true))
		.toStrictEqual ('no')
	
})

/**
 * simply swap arguments in place
 */
const _pipe = <A, B, C>
(
	a: (a_: A) => B,
	b: (b_: B) => C,
): (a1_: A) => C =>
	c => b (a (c))

it ('should test pipe', async () => {
	expect.assertions (2)
	const c = _pipe (b, a)
	
	expect (c (false))
		.toStrictEqual ('yes')
	
	expect (c (true))
		.toStrictEqual ('no')
	
})

/*
 * But what if B != C? How can we compose such functions? Should we just give up?
 
 In the next post we'll see under which conditions such a
 * composition is possible. We'll talk about functors.
 
 TLDR: functional programming is all about composition
 * (piping ftw)
 * */

const c = (c: 'yes' | 'no') => c === 'yes'

/**
 * Same idea (?), but can supply unlimited functions
 */
const f = flow(b, a, c, b, a)

it ('should test flow', async () => {
	expect.assertions(1)
	const act = f(true)
	expect (act).toStrictEqual('yes')
})
