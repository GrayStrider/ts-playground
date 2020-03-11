import { Union, of } from 'ts-union'
import { isSE } from '../state-machine/resetState.spec'

type CheckNumber = number
type CardType = 'MasterCard' | 'Visa'
type CardNumber = number

const PaymentMethod = Union ({
	Check: of<CheckNumber> (),
	CreditCard: of<CardType, CardNumber> (),
	Cash: of (null)
})

const { Cash, Check, CreditCard } = PaymentMethod

it ('should create card', async () => {
	expect.assertions (1)
	const card = CreditCard ('MasterCard', 12345)
	isSE (card, {
		k: 'CreditCard',
		p: ['MasterCard', 12345]
	})
})

it ('should create check', async () => {
	expect.assertions (1)
	const check = Check (15566909)
	isSE (check, {
		'k': 'Check', 'p': [15566909]
	})
})

it ('should create cash', async () => {
	expect.assertions (1)
	const cash = Cash // just value
	isSE (cash, {
		'k': 'Cash', 'p': []
	})
	
})
