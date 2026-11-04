import blueberryIceCream from '../assets/blueberry-ice.png'
import chocoPudding from '../assets/choco-pudding.png'
import greenIceCream from '../assets/green-ice-cream.png'
import macaIceCream from '../assets/maca-ice-cream.png'
import milkIceCream from '../assets/milk-ice-cream.png'
import orangeIceCream from '../assets/orange-ice-cream.png'
import strawberryDessert from '../assets/strawberry-dessert.png'
import strawberryIceCream from '../assets/strawberry-ice-cream.png'
import vanillaIceCream from '../assets/cup-of-ice-cream.png'
import chocolateFlavor from '../assets/chocolate-ice-cream.png'

export type ProductFilter = 'all' | 'new' | 'bestsellers'

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
		badge: 'New flavor',
		badgeTone: 'badge-pink',
		isNew: true,
		isBestseller: true,
	},
	{
		id: 2,
		name: 'Cherry Garcia Ice Cream',
		price: 11,
		image: strawberryDessert,
		badge: '50% off',
		badgeTone: 'badge-orange',
		isNew: false,
		isBestseller: true,
	},
	{
		id: 3,
		name: 'Chocolate Cookie Crunch',
		price: 10,
		image: chocoPudding,
		badge: 'Sold out',
		badgeTone: 'badge-green',
		isSoldOut: true,
		isNew: false,
		isBestseller: false,
	},
	{
		id: 4,
		name: 'Raspberry Ripple',
		price: 8.5,
		image: blueberryIceCream,
		isNew: true,
		isBestseller: true,
	},
	{
		id: 5,
		name: 'Mango Sorbet',
		price: 8,
		image: orangeIceCream,
		badge: 'Dairy free',
		badgeTone: 'badge-green',
		isNew: true,
		isBestseller: false,
	},
	{
		id: 6,
		name: 'Vanilla Bean Dream',
		price: 9.25,
		image: vanillaIceCream,
		isNew: false,
		isBestseller: true,
	},
	{
		id: 7,
		name: 'Pistachio & Honey',
		price: 10.5,
		image: greenIceCream,
		isNew: true,
		isBestseller: false,
	},
	{
		id: 8,
		name: 'Cookies & Cream',
		price: 9.5,
		image: macaIceCream,
		isNew: false,
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
		image: blueberryIceCream,
	},
]
