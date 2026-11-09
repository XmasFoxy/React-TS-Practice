import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { getFavoritesFromFirestore, getUserDataErrorMessage, setFavoriteInFirestore } from '../../../entities/userData/userDataService'
import { useAuth } from '../../auth/model/useAuth'
import { FavoritesContext } from './FavoritesContext'

type FavoritesProviderProps = {
	children: ReactNode
}

type FavoriteMutation = {
	userId: string
	productId: number
	isFavorite: boolean
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const userId = user?.uid
	const queryKey = ['favorites', userId] as const
	const favoritesQuery = useQuery({
		queryKey,
		queryFn: () => {
			if (!userId) {
				throw new Error('You must be signed in to load favorites.')
			}

			return getFavoritesFromFirestore(userId)
		},
		enabled: Boolean(userId),
		retry: false,
	})
	const favoriteMutation = useMutation({
		mutationFn: ({ userId: ownerId, productId, isFavorite }: FavoriteMutation) =>
			setFavoriteInFirestore(ownerId, productId, isFavorite),
		onMutate: async ({ productId, isFavorite }) => {
			await queryClient.cancelQueries({ queryKey })
			const previousIds = queryClient.getQueryData<number[]>(queryKey) ?? []
			const nextIds = isFavorite
				? [...new Set([...previousIds, productId])]
				: previousIds.filter((id) => id !== productId)

			queryClient.setQueryData(queryKey, nextIds)

			return { previousIds }
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousIds)
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	})
	const favoriteIds = userId ? favoritesQuery.data ?? [] : []
	const error = favoritesQuery.error ?? favoriteMutation.error

	return (
		<FavoritesContext.Provider
			value={{
				favoriteIds,
				isLoading: Boolean(userId) && favoritesQuery.isPending,
				error: error ? getUserDataErrorMessage(error) : null,
				toggleFavorite: (productId) => {
					if (!userId) {
						return
					}

					favoriteMutation.mutate({
						userId,
						productId,
						isFavorite: !favoriteIds.includes(productId),
					})
				},
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}
