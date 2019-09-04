const [a, b] = [1, 0];

let a, b;
({ a, b } = { a: 10, b: 70 });
console.log(a, b); // separate from declaration, note the brackets!

const foo = [10, 20, 30];
const [a, , b] = foo;
console.log(a, b); // ignore some values

const foo = { a: false, b: 40 };
const { a: c, b: d } = foo;
console.log(c, d); // assign new names

const { a: aa = 10, b: bb = 5 } = { a: 3 };
console.log(aa, bb); // both default value and new name!

const [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);
const { a, b, ...rest } = { x: 50, b: 20, a: 10, c: 30 };
console.log(rest);// by prop name!

const [a, b = 5] = [2];
console.log(a, b); // default value

const [a, b] = [1, 2];
const [b, a] = [a, b];
console.log(a, b); // swap variables!

function parseProtocol(url) {
  const parsedURL = /^(\w+):\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]
  const [, protocol, fullhost, fullpath] = parsedURL;
  return [protocol, fullhost, fullpath];
}

console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"


function drawES2015Chart({
                           size = 'big', coords = { x: 0, y: 0 }, radius = 25
                         } = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}

drawES2015Chart({
  coords: { x: 18, y: 30 },
  radius: 30
});
drawES2015Chart(); // thanks to = {} assignment, call without args is possible

let key = 'z';
let {[key]: foo} = {z: 'bar'};
console.log(foo); // computed property names!

const props = [
  { id: 1, name: 'Fizz'},
  { id: 2, name: 'Buzz'},
  { id: 3, name: 'FizzBuzz'}
];
const [,, { name }] = props;
console.log(name); // combine array and object destructuring

const str = 'abc';
console.log([...str]); // since string is an Iterable

// generator expressions
function* generator(num: number) {
  yield num;
  yield num * 2;
  return `Done! ${num + 5}`;
}
for (let generatorElement of generator(10)) {
  console.log(generatorElement);
}
const gen = generator(10);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
