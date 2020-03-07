const add = (x: number, y: number) => x + y
const multiply = (x: number, y: number) => x * y

const flockA = 4
const flockB = 2
const flockC = 0
const result = add(
	multiply(flockB, add(flockA, flockC)),
	multiply(flockA, flockB)
)

