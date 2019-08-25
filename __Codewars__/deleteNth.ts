function deleteNth(arr:(number)[], x: number) {
  const cache: {
    [index: number]: number
  } = {}
  return arr.filter(function(n) {
    cache[n] = (cache[n] || 0) + 1
    return cache[n] <= x
  })
}

console.log(deleteNth([1, 1, 2, 1], 2))
