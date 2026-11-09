export type ProductImageKey =
	| 'assortedScoops'
	| 'blueberry'
	| 'blueberryScoop'
	| 'chocolate'
	| 'chocolateFudge'
	| 'chocolateWaffle'
	| 'colorful'
	| 'dessertSelection'
	| 'maca'
	| 'milk'
	| 'orange'
	| 'pistachio'
	| 'raspberry'
	| 'strawberry'
	| 'strawberryDessert'
	| 'vanilla'
	| 'winterBowl'

export type ProductRecord = {
	id: number
	name: string
	price: number
	rating: number
	imageKey: ProductImageKey
	badge?: string
	badgeTone?: string
	isSoldOut?: boolean
	isNew: boolean
	isBestseller: boolean
}

export type Product = ProductRecord & {
	image: string
}
