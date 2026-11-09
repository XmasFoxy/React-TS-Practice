import { createContext } from 'react'

export type FavoritesContextValue = {
	favoriteIds: number[]
	isLoading: boolean
	error: string | null
	toggleFavorite: (productId: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
