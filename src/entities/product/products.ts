import blueberryIceCream from '../../assets/blueberry-ice.png'
import blueberryScoop from '../../assets/ice-cream-blueberry.png'
import assortedScoops from '../../assets/additions.png'
import chocolatePudding from '../../assets/choco-pudding.png'
import chocolateScoop from '../../assets/chocolate-ice-cream.png'
import chocolateWaffle from '../../assets/choco-in-vafel.png'
import colorfulIceCream from '../../assets/colorful-ice-cream.png'
import dessertSelection from '../../assets/desserts.png'
import greenIceCream from '../../assets/green-ice-cream.png'
import iceCreamBowl from '../../assets/ice-cream-bowl.png'
import macaIceCream from '../../assets/maca-ice-cream.png'
import milkIceCream from '../../assets/milk-ice-cream.png'
import orangeIceCream from '../../assets/orange-ice-cream.png'
import raspberryIceCream from '../../assets/raspberry-ice-cream.png'
import strawberryDessert from '../../assets/strawberry-dessert.png'
import strawberryIceCream from '../../assets/strawberry-ice-cream.png'
import vanillaIceCream from '../../assets/cup-of-ice-cream.png'
import chocolateFlavor from '../../assets/ice-cream-bowl.png'
import naturalYogurtFlavor from '../../assets/choco-in-vafel.png'
import { productRecords } from './productRecords'
import type { Product, ProductImageKey } from './productTypes'

export type { Product, ProductImageKey, ProductRecord } from './productTypes'

export const productImages = {
	assortedScoops,
	blueberry: blueberryIceCream,
	blueberryScoop,
	chocolate: chocolateScoop,
	chocolateFudge: chocolatePudding,
	chocolateWaffle,
	colorful: colorfulIceCream,
	dessertSelection,
	maca: macaIceCream,
	milk: milkIceCream,
	orange: orangeIceCream,
	pistachio: greenIceCream,
	raspberry: raspberryIceCream,
	strawberry: strawberryIceCream,
	strawberryDessert,
	vanilla: vanillaIceCream,
	winterBowl: iceCreamBowl,
} satisfies Record<ProductImageKey, string>

export const products: Product[] = productRecords.map((product) => ({
	...product,
	image: productImages[product.imageKey],
}))

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
