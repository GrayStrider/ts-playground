import sleep from 'sleep-promise'

async function bootstrap() {
	let trace = (value: any) => {
		console.log(value)
		return value
	}
	
	sleep(2000)
		.then(() => 'hello')
		.then(trace)
		.then(sleep(1000))
		.then((value) => value + ' world')
		.then(trace)
		.then(sleep(500))
		.then((value) => value + '!')
		.then(trace)
	
	sleep(300).then(trace)
}
