import _ from 'lodash'

export interface IFormValues {
  artworkName: string;
  artistName: string;
  number: number
}

const values: IFormValues = {
  artistName: 'Me',
  artworkName: 'blah',
  number: 20,
}

// const entries = Object.entries(values)

const entries = Object.entries as <T>(o: T) =>
  [Extract<keyof T, string>, T[keyof T]][]

type o = { [key: string]: number }
let o: o = { x: 5 }

console.log(entries(o))

let p = <[keyof o, number][]>Object.entries(o)
p.map(([k, v]) => v + 1)


console.log(p)

type oneOf = IFormValues[keyof IFormValues]

const obj = {
  prop1: 'value',
  prop2: 'value',
}

const result = _.map(values, (value, prop) =>
  [prop + '_',
    typeof value === 'number'
    ? value + 1
    : value + '_'])

console.log(result)

type CastObjectToType<Obj extends object, TypeToCastTo> =
  Record<keyof Obj, TypeToCastTo>

const obj1 = {
  prop: 'hello',
  prop2: 10,
}

const obj2: CastObjectToType<typeof obj1, string> = {
  prop: 'test',
  prop2: 'works',

}

type ObjectKeys<Obj extends object> = (keyof Obj)[]
const keys: ObjectKeys<typeof obj> = ['prop1', 'prop2']

const foo = <Obj extends object, Key extends keyof Obj>(arg: Obj, arg2: Key) => {}
const foo2 = <Obj extends object>(arg: Obj, arg2: keyof Obj) => {}

foo(obj1, 'prop2')

namespace ConvertDate {
  // let startDateTime = new Date()
  //
  // let startYear = startDateTime.getFullYear()
  // let startMonth: any = startDateTime.getMonth() + 1
  //
  // if (startMonth < 10) {
  //   startMonth = `0${startMonth}`
  // }
  //
  // let startDate: any = startDateTime.getDate()
  //
  // if (startDate < 10) {
  //   startDate = `0${startDate}`
  // }
  //
  // let startHours: any = startDateTime.getHours()
  //
  // if (startHours < 10) {
  //   startHours = `0${startHours}`
  // }
  //
  // let startMinutes: any = startDateTime.getMinutes()
  //
  // if (startMinutes < 10) {
  //   startMinutes = `0${startMinutes}`
  // }
  //
  // let startSeconds: any = startDateTime.getSeconds()
  //
  // if (startSeconds < 10) {
  //   startSeconds = `0${startSeconds}`
  // }
  //
  // this.startParam = `${startYear}-${startMonth}-${startDate} ${startHours}:${startMinutes}:${startSeconds}`
  // console.log(this.startParam)

  const formatDate = (date: Date = new Date()) => {
    const padWithZero = (num: number) =>
      String(num).padStart(2, '0')

    const year = date.getFullYear()
    const month = padWithZero((date.getMonth() + 1))
    const day = padWithZero(date.getDay())
    const hour = padWithZero(date.getHours())
    const minutes = padWithZero(date.getMinutes())
    const seconds = padWithZero(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  }

  console.log(formatDate())
}

const obj3 = {
  prop: {
    prop2: 'test',
  },
}

const { prop2 } = obj3.prop
