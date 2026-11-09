import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../auth/model/useAuth'
import {
	addCartProduct,
	getCartFromFirestore,
	getUserDataErrorMessage,
	removeCartProduct,
	updateCartProduct,
} from '../../../entities/userData/userDataService'
import { CartContext, type CartItem } from './CartContext'
import type { ReactNode } from 'react'

type CartProviderProps = {
	children: ReactNode
}

type CartMutation = {
	userId: string
	productId: number
	quantity?: number
}

export function CartProvider({ children }: CartProviderProps) {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const userId = user?.uid
	const queryKey = ['cart', userId] as const
	const cartQuery = useQuery({
		queryKey,
		queryFn: () => {
			if (!userId) {
				throw new Error('You must be signed in to load your cart.')
			}

			return getCartFromFirestore(userId)
		},
		enabled: Boolean(userId),
		retry: false,
	})

	const addMutation = useMutation({
		mutationFn: ({ userId: ownerId, productId }: CartMutation) =>
			addCartProduct(ownerId, productId),
		onMutate: async ({ productId }) => {
			await queryClient.cancelQueries({ queryKey })
			const previousItems = queryClient.getQueryData<CartItem[]>(queryKey) ?? []
			const existingItem = previousItems.find((item) => item.productId === productId)

			queryClient.setQueryData<CartItem[]>(queryKey, existingItem
				? previousItems.map((item) => item.productId === productId
					? { ...item, quantity: item.quantity + 1 }
					: item)
				: [...previousItems, { productId, quantity: 1 }])

			return { previousItems }
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousItems)
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	})

	const updateMutation = useMutation({
		mutationFn: ({ userId: ownerId, productId, quantity }: CartMutation) => {
			if (quantity === undefined) {
				throw new Error('A cart quantity is required.')
			}

			return updateCartProduct(ownerId, productId, quantity)
		},
		onMutate: async ({ productId, quantity }) => {
			await queryClient.cancelQueries({ queryKey })
			const previousItems = queryClient.getQueryData<CartItem[]>(queryKey) ?? []

			queryClient.setQueryData<CartItem[]>(queryKey, quantity !== undefined && quantity > 0
				? previousItems.map((item) => item.productId === productId
					? { ...item, quantity }
					: item)
				: previousItems.filter((item) => item.productId !== productId))

			return { previousItems }
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousItems)
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	})

	const removeMutation = useMutation({
		mutationFn: ({ userId: ownerId, productId }: CartMutation) =>
			removeCartProduct(ownerId, productId),
		onMutate: async ({ productId }) => {
			await queryClient.cancelQueries({ queryKey })
			const previousItems = queryClient.getQueryData<CartItem[]>(queryKey) ?? []

			queryClient.setQueryData(
				queryKey,
				previousItems.filter((item) => item.productId !== productId),
			)

			return { previousItems }
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousItems)
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	})

	const items = userId ? cartQuery.data ?? [] : []
	const itemCount = items.reduce((total, item) => total + item.quantity, 0)
	const mutationError = addMutation.error ?? updateMutation.error ?? removeMutation.error

	return (
		<CartContext.Provider
			value={{
				items,
				itemCount,
				isLoading: Boolean(userId) && cartQuery.isPending,
				error: cartQuery.error
					? getUserDataErrorMessage(cartQuery.error)
					: mutationError
						? getUserDataErrorMessage(mutationError)
						: null,
				addToCart: (productId) => {
					if (userId) {
						addMutation.mutate({ userId, productId })
					}
				},
				removeFromCart: (productId) => {
					if (userId) {
						removeMutation.mutate({ userId, productId })
					}
				},
				updateQuantity: (productId, quantity) => {
					if (userId) {
						updateMutation.mutate({ userId, productId, quantity })
					}
				},
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
