import { Union, of } from 'ts-union'
import { isSE } from '@strider/utils-ts'
import { fromNullable, some, none } from 'fp-ts/lib/Option'

type CheckNumber = number
type CardType = 'MasterCard' | 'Visa'
type CardNumber = number

// PaymentMethod
const PM = Union ({
	Check: of<CheckNumber> (),
	CreditCard: of<CardType, CardNumber> (),
	Cash: of (null)
})

const { Cash, Check, CreditCard } = PM

const card = CreditCard ('MasterCard', 12345)
const check = Check (15566909)
const cash = Cash // just value


describe ('creating values', () => {
	it ('should create card', async () => {
		expect.assertions (1)
		isSE (card, {
			k: 'CreditCard',
			p: ['MasterCard', 12345]
		})
	})
	
	it ('should create check', async () => {
		expect.assertions (1)
		isSE (check, {
			'k': 'Check', 'p': [15566909]
		})
	})
	
	it ('should create cash', async () => {
		expect.assertions (1)
		isSE (cash, {
			'k': 'Cash', 'p': []
		})
		
	})
	
})

describe ('matching', () => {
	const str = PM.match (cash, {
		Cash: () => 'cash',
		Check: n => `check num: ${n.toString ()}`,
		CreditCard: (type, n) => `${type} ${n}`
	})
	
	it ('should match', async () => {
		expect.assertions (1)
		isSE (str, 'cash')
	})
	
	const toStr = PM.match ({
		Cash: () => 'cash',
		default: _v => 'not cash' // _v is the union obj
	})
	
	const toStrOpt = PM.match ({
		Cash: () => some('got cash'),
		default: _v => none // _v is the union obj
	})
	
	it ('should match curried', async () => {
		expect.assertions (3)
		isSE (toStr (card), 'not cash')
		isSE(toStrOpt(cash), some('got cash'))
		isSE(toStrOpt(check), none)
	})
	
	it ('should simplified match', async () => {
		expect.assertions (3)
		isSE (PM.if.Cash (cash, () => 'yep'),
			'yep'
		)
		
		const safeVal = (v: any) => fromNullable (
			PM.if.Cash (v, () => 'yep')
		)
		
		isSE (safeVal(cash), some ('yep'))
		isSE (safeVal(card), none)
		
	})
})

