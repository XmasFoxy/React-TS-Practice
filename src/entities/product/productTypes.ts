export type ProductImageKey =
	| 'blueberry'
	| 'blueberryScoop'
	| 'chocolate'
	| 'chocolateFudge'
	| 'chocolateWaffle'
	| 'colorful'
	| 'maca'
	| 'milk'
	| 'orange'
	| 'pistachio'
	| 'purple'
	| 'raspberry'
	| 'strawberry'
	| 'strawberryDessert'
	| 'vanilla'
	| 'winterBowl'

export type ProductRecord = {
	id: number
	name: string
	price: number
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
