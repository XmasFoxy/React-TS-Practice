import { useState, type ReactNode } from 'react'
import { useAuth } from '../../auth/model/useAuth'
import { CartContext, type CartItem } from './CartContext'

type CartProviderProps = {
	children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
	const { user } = useAuth()
	const [cart, setCart] = useState<{ ownerUid: string; items: CartItem[] } | null>(null)
	const items = user && cart?.ownerUid === user.uid ? cart.items : []
	const itemCount = items.reduce((total, item) => total + item.quantity, 0)

	function addToCart(productId: number) {
		if (!user) {
			return
		}

		setCart((currentCart) => {
			const currentItems = currentCart?.ownerUid === user.uid
				? currentCart.items
				: []

			const existingItem = currentItems.find((item) => item.productId === productId)

			if (existingItem) {
				return {
					ownerUid: user.uid,
					items: currentItems.map((item) => {
						if (item.productId === productId) {
							return {
								...item,
								quantity: item.quantity + 1,
							}
						}

						return item
					}),
				}
			}

			return {
				ownerUid: user.uid,
				items: [
					...currentItems,
					{
						productId,
						quantity: 1,
					},
				],
			}
		})
	}

	function removeFromCart(productId: number) {
		if (!user) {
			return
		}

		setCart((currentCart) => {
			if (currentCart?.ownerUid !== user.uid) {
				return currentCart
			}

			return {
				...currentCart,
				items: currentCart.items.filter((item) => item.productId !== productId),
			}
		})
	}

	function updateQuantity(productId: number, quantity: number) {
		if (quantity < 1) {
			removeFromCart(productId)
			return
		}

		if (!user) {
			return
		}

		setCart((currentCart) => {
			if (currentCart?.ownerUid !== user.uid) {
				return currentCart
			}

			return {
				...currentCart,
				items: currentCart.items.map((item) => {
					if (item.productId === productId) {
						return {
							...item,
							quantity,
						}
					}

					return item
				}),
			}
		})
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
