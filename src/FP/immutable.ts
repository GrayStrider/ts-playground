import { Map, Record } from 'src/FP/immutable'

// Aliases: p = player, a = attacker, t = target

const makePlayer = (name: string, hp: number, team: string) =>
	Map({ name, hp, team })

type P = ReturnType<typeof makePlayer>
const jobe = makePlayer('Jobe', 20, 'red')
const michael = makePlayer('Michael', 30, 'green')
const punch = (a: P, t: P) =>
	t.set('hp', t.get('hp') ?? 0 - 1);

console.log(punch(jobe, michael).get('hp'))

interface MyRecord {
	name: string
	hp: number
	team: 'red' | 'green'
}

const newMap = Map({})
const record = Record<MyRecord>({ hp: 10, name: 'Me', team: 'green' })
const instance = new record({ name: 'value' })

console.log(instance.get('team'))
