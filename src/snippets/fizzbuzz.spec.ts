it.skip('for', async () => {
	for (let i = 1; i <= 100; i++) {
		const result =
			(i % 3 === 0) ? 'Foo' :
				(i % 5 === 0) ? 'Baz' :
					(i)
		console.log(result)
	}
})

it.skip('generator', async () => {
	function* fizzbuzz(iterations: number) {
		for (let i = 1; i <= iterations; i++) {
			yield i % 3 === 0 ? 'Foo' : i % 5 === 0 ? 'Baz' : i
		}
	}
	
	for (const x of fizzbuzz(100)) {
		process.stdout.write(String(x))
	}
	
})
