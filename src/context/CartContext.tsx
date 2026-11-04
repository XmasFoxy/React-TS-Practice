import { createContext, useContext, useState, type ReactNode } from 'react'

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

const CartContext = createContext<CartContextValue | null>(null)

type CartProviderProps = {
	children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
	const [items, setItems] = useState<CartItem[]>([])
	const itemCount = items.reduce((total, item) => total + item.quantity, 0)

	function addToCart(productId: number) {
		setItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.productId === productId)

			if (existingItem) {
				return currentItems.map((item) => {
					if (item.productId === productId) {
						return {
							...item,
							quantity: item.quantity + 1,
						}
					}

					return item
				})
			}

			return [
				...currentItems,
				{
					productId,
					quantity: 1,
				},
			]
		})
	}

	function removeFromCart(productId: number) {
		setItems((currentItems) =>
			currentItems.filter((item) => item.productId !== productId),
		)
	}

	function updateQuantity(productId: number, quantity: number) {
		if (quantity < 1) {
			removeFromCart(productId)
			return
		}

		setItems((currentItems) =>
			currentItems.map((item) => {
				if (item.productId === productId) {
					return {
						...item,
						quantity,
					}
				}

				return item
			}),
		)
	}

	return (
		<CartContext.Provider
			value={{
				items,
				itemCount,
				addToCart,
				removeFromCart,
				updateQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error('useCart must be used inside CartProvider')
	}

	return context
}
