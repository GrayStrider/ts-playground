// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
  return [
    { kind: "circle", radius: 100 },
    { kind: "square", sideLength: 50 },
  ] as const
}

for (const shape of getShapes()) {
  if (shape.kind === "circle") {
    const radius: number = shape.radius; // throws error without as const
  } else {
    const length: number = shape.sideLength;
  }
}

const x_ = { x: 'test'} as const // readonly
console.log(typeof x_.x)

const str: 'string!' = 'string!' // will not widen
console.log(typeof str) // type 'string!'

let str2 = str
console.log(typeof str2) // widened to string
