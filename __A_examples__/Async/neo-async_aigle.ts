import async from 'neo-async'

const order: string[] = []
const array = [1, 3, 2]
const iterator = (num, done) => {
  setTimeout(() => {
    order.push(num)
    done(null, num)
  }, num * 10)
}
async.map(array, iterator, (err, res) => {
  console.log(res) // [1, 3, 2];
  console.log(order) // [1, 2, 3]
})
