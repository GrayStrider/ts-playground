const appendToEach = (array:number[], append:string) => array.map(value => value + append)

let promise = new Promise((resolve, reject) => {
  const list = [...Array(9999999).keys()]
  const result = appendToEach(list, '_');
  resolve(result);
});


const async = async () => {
  console.log('starting')
  await promise.then(value => console.log(value))
}

async(); //ctrl + shift + number
