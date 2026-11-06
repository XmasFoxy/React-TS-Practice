import { useState, type ReactNode } from 'react'
import { CartContext, type CartItem } from './CartContext'

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
