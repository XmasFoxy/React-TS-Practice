import blueberryIceCream from '../../assets/blueberry-ice.png'
import chocolatePudding from '../../assets/choco-pudding.png'
import chocolateScoop from '../../assets/chocolate-ice-cream.png'
import colorfulIceCream from '../../assets/colorful-ice-cream.png'
import greenIceCream from '../../assets/green-ice-cream.png'
import macaIceCream from '../../assets/maca-ice-cream.png'
import milkIceCream from '../../assets/milk-ice-cream.png'
import orangeIceCream from '../../assets/orange-ice-cream.png'
import strawberryDessert from '../../assets/strawberry-dessert.png'
import strawberryIceCream from '../../assets/strawberry-ice-cream.png'
import vanillaIceCream from '../../assets/cup-of-ice-cream.png'
import chocolateFlavor from '../../assets/ice-cream-bowl.png'
import naturalYogurtFlavor from '../../assets/choco-in-vafel.png'

export type Product = {
	id: number
	name: string
	price: number
	image: string
	badge?: string
	badgeTone?: string
	isSoldOut?: boolean
	isNew: boolean
	isBestseller: boolean
}

export const products: Product[] = [
	{
		id: 1,
		name: 'Strawberry & Lingonberry',
		price: 7.9,
		image: strawberryIceCream,
		isNew: true,
		isBestseller: true,
	},
	{
		id: 2,
		name: 'Cherry Garcia Ice Cream',
		price: 11,
		image: strawberryDessert,
		badge: '50%',
		badgeTone: 'badge-orange',
		isNew: false,
		isBestseller: true,
	},
	{
		id: 3,
		name: 'Chocolate Cookie Crunch',
		price: 10,
		image: chocolateScoop,
		badge: 'Sold Out',
		badgeTone: 'badge-green',
		isSoldOut: true,
		isNew: false,
		isBestseller: false,
	},
	{
		id: 4,
		name: 'Raspberry Ripple',
		price: 9,
		image: chocolatePudding,
		badge: 'New',
		badgeTone: 'badge-yellow',
		isNew: true,
		isBestseller: true,
	},
	{
		id: 5,
		name: 'Mango Sorbet',
		price: 8,
		image: colorfulIceCream,
		badge: 'Sale',
		badgeTone: 'badge-pink',
		isNew: true,
		isBestseller: true,
	},
	{
		id: 6,
		name: 'Vanilla Bean Dream',
		price: 15,
		image: orangeIceCream,
		badge: 'New',
		badgeTone: 'badge-yellow',
		isNew: true,
		isBestseller: true,
	},
	{
		id: 7,
		name: 'Pistachio & Honey',
		price: 13,
		image: greenIceCream,
		badge: 'Sold Out',
		badgeTone: 'badge-green',
		isSoldOut: true,
		isNew: false,
		isBestseller: false,
	},
	{
		id: 8,
		name: 'Cookies & Cream',
		price: 12,
		image: blueberryIceCream,
		badge: 'New',
		badgeTone: 'badge-yellow',
		isNew: true,
		isBestseller: true,
	},
]

export const flavors = [
	{
		name: 'Vanilla',
		image: vanillaIceCream,
	},
	{
		name: 'Chocolate',
		image: chocolateFlavor,
	},
	{
		name: 'Milk',
		image: milkIceCream,
	},
	{
		name: 'Maca',
		image: macaIceCream,
	},
	{
		name: 'Natural yogurt',
		image: naturalYogurtFlavor,
	},
]
