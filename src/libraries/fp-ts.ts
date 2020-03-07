import { flow, not } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Reader'
import {deepStrictEqual as deepEq} from 'assert'
import { sig } from '@strider/utils-ts'
import * as S from 'sanctuary'
import { should } from 'chai'


const len = S.prop('length')
const double = S.mult(2)
const gt2 = S.gt(2)

const comp = flow(len, double)
// equivalent to
const composition2 = pipe(len, map(double), map(gt2))

const s = 'hello'
deepEq(flow(len)(s), 5)
deepEq(flow(len, double)(s), 10)
deepEq(flow(len, double, gt2)(s), true)
deepEq(pipe(len)(s), 5)
deepEq(not(Boolean)(true), false)
deepEq(not(Boolean)(false), true)
deepEq(not(S.lt(5))(10), true)

sig.success()

