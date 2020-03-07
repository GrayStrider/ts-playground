import { chance } from '@strider/utils-ts'

interface Bird {
	fly(): void
	layEggs(): void
}

interface Fish {
	swim(): void
	layEggs(): void
}

function getSmallPet(): Fish | Bird {
	return chance.pickone([])
}

let pet = getSmallPet()
pet.layEggs()
if ('swim' in pet) {
	pet.swim()
}
