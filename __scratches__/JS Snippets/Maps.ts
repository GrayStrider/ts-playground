/*
A Map object is a simple key/value map and can iterate its elements in insertion order.

- Use maps over objects when keys are unknown until run time,
and when all keys are the same type and all values are the same type.
- Use maps if there is a need to store primitive values as keys because
object treats each key as a string whether it's a number value,
boolean value or any other primitive value.
- Use objects when there is logic that operates on individual elements.
 */

let sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
console.log(sayings.size); // 3
sayings.get('fox'); // undefined
sayings.has('bird'); // false
sayings.delete('dog');
sayings.has('dog'); // false

// "cat goes meow"
// "elephant goes toot"
sayings.clear();

console.log(sayings.size); // 0
sayings.set(false, 'true string!')
sayings.get(false) //?
sayings.set({ key: 'value' }, 'object')

sayings.get({ key: 'value'}) //?

for (const [key, value] of sayings) {
  console.log(key + ' goes ' + value);
}
