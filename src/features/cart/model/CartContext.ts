import { createContext } from 'react'

export type CartItem = {
	productId: number
	quantity: number
}

type CartContextValue = {
	items: CartItem[]
	itemCount: number
	addToCart: (productId: number) => void
	removeFromCart: (productId: number) => void
	updateQuantity: (productId: number, quantity: number) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
