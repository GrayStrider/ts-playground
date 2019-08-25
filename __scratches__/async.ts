// const largeArray = [...Array(999999).keys()]
//
// const arr = [ { key: 1 }, { key: 2 }, { key: 3 } ]
// const result = Promise.all(arr.map(async (obj) => { return obj.key; }));
// console.log(result);
//
// const promise = new Promise((resolve, reject) => {
//
// })
//
// const list = [...Array(99999).keys()] //...an array filled with values
//
// const functionWithPromise = item => { //a function that returns a promise
//   return Promise.resolve(item)
// }
//
// const anAsyncFunction = async item => {
//   return await functionWithPromise(item)
// }
//
// const getData = async () => {
//   return await Promise.all(list.map(item => anAsyncFunction(item)))
// }
//
// const data = getData()
// console.log(data)
//
// console.log(functionWithPromise('ok'));

async function sleep(data: unknown) {
  return await setTimeout((data) => data, 1000);
}

async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 3000)
  });

  let result = await promise; // wait till the promise resolves (*)

  console.log(result); // "done!"
}

console.log(f());
