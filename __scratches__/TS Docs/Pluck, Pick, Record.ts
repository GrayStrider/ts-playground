interface Person {
  name: string;
  age: number;
  occupation: string;
}

let person: Person = {
  name:       'Jarid',
  age:        35,
  occupation: 'Janitor'
}

// Pluck
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

let pluckStrings: string[] = pluck(person, ['name', 'occupation'])
console.log(pluckStrings)

// Pick
const pers: Pick<Person, 'name' | 'age'> = {
  name: 'test',
  age:  20
}

enum CatNames {miffy = 'miffy', boris = 'boris', mordred = 'mordred'}

type CatList = Record<CatNames, { age: number }>
const cats: CatList = {
  miffy:   { age: 99 },
  boris:   { age: 16 },
  mordred: { age: 34 },
}

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
type ThreeStringProps = { prop1: string, prop2: string, prop3: string }
