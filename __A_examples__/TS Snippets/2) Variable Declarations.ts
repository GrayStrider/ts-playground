const readonly: readonly number[] = [1, 2, 3]; // readonly variables
const readonly2: readonly [number, number, boolean] = [1, 2, false];
// Applying the principle of least privilege, all declarations other than those you plan to modify should use const.
let input = [1, 2];
let [first, second] = [1, 2] /* input */; // destructuring
let object = {age: 65, name_: 'Sam', gender: 'male'}
let {name_, age, gender: genderName} = object // object desctructuring, new variable names
first = input[0];
second = input[1]; // same thing
[first, second] = [second, first]; // swap variables
let { age: age2, ...passthrough } = object;
let total = passthrough.gender + passthrough.name_.length; // var for remaining items
// object spread removes methods
