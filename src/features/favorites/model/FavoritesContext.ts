import { createContext } from 'react'

export type FavoritesContextValue = {
	favoriteIds: number[]
	toggleFavorite: (productId: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
