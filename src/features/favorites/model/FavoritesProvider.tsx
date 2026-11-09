import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '../../auth/model/useAuth'
import { FavoritesContext } from './FavoritesContext'

type FavoritesProviderProps = {
	children: ReactNode
}

type FavoriteState = {
	ownerUid: string
	productIds: number[]
}

function isProductIdArray(value: unknown): value is number[] {
	return Array.isArray(value)
		&& value.every((productId: unknown) =>
			typeof productId === 'number'
			&& Number.isSafeInteger(productId)
			&& productId > 0,
		)
}

function readFavoriteIds(userId: string): number[] {
	const storedFavorites = window.localStorage.getItem(`gelato-favorites:${userId}`)

	if (!storedFavorites) {
		return []
	}

	const parsedFavorites: unknown = JSON.parse(storedFavorites)

	if (!isProductIdArray(parsedFavorites)) {
		throw new Error(`Saved favorites for user "${userId}" are invalid.`)
	}

	return parsedFavorites
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
	const { user } = useAuth()
	const userId = user?.uid ?? null
	const [favorites, setFavorites] = useState<FavoriteState | null>(null)
	const favoriteIds = useMemo(() => {
		if (!userId) {
			return []
		}

		return favorites?.ownerUid === userId
			? favorites.productIds
			: readFavoriteIds(userId)
	}, [favorites, userId])

	useEffect(() => {
		if (!userId || favorites?.ownerUid !== userId) {
			return
		}

		window.localStorage.setItem(
			`gelato-favorites:${userId}`,
			JSON.stringify(favorites.productIds),
		)
	}, [favorites, userId])

	function toggleFavorite(productId: number) {
		if (!userId) {
			return
		}

		setFavorites((currentFavorites) => {
			const currentIds = currentFavorites?.ownerUid === userId
				? currentFavorites.productIds
				: favoriteIds

			return {
				ownerUid: userId,
				productIds: currentIds.includes(productId)
					? currentIds.filter((id) => id !== productId)
					: [...currentIds, productId],
			}
		})
	}

	return (
		<FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
			{children}
		</FavoritesContext.Provider>
	)
}
