import { Monoid, getStructMonoid } from 'fp-ts/lib/Monoid'
import { Option, some, none, getLastMonoid, getFirstMonoid } from 'fp-ts/lib/Option'
import { getMonoid, range } from 'fp-ts/lib/Array'
import { isSE } from '@strider/utils-ts'


//==========================================================
// As an example, getLastMonoid can be useful for managing optional values
//==========================================================


interface Settings {
	fontFamily: Option<string>
	fontSize: Option<number>
	maxColumn: Option<number>
}

const monoidSettings: Monoid<Settings> = getStructMonoid ({
	fontFamily: getFirstMonoid<string> (),
	fontSize: getLastMonoid<number> (),
	maxColumn: getLastMonoid<number> ()
})

const workspaceSettings: Settings = {
	fontFamily: some ('Courier'),
	fontSize: none,
	maxColumn: some (80)
}

const userSettings: Settings = {
	fontFamily: some ('Fira Code'),
	fontSize: some (12),
	maxColumn: none
}

/**
 * Should prefer user settings for all but fontFamily
 */
it ('should correctly override settings', async () => {
	expect.assertions (1)
	const act = monoidSettings.concat (workspaceSettings, userSettings)
	const exp: Settings = {
		fontFamily: some ('Courier'),
		fontSize: some (12),
		maxColumn: some (80)
	}
	expect (act).toStrictEqual (exp)
})

it ('monoid methods', async () => {
	expect.assertions (2)
	const { empty, concat } = getMonoid<number> ()
	isSE (empty, [])
	let numsArr: typeof empty // number[], could be useful for inline empty arrays
	isSE (concat ([1, 2], [3, 4]), range (1, 4))
})
