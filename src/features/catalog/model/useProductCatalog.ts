import { useState } from 'react'
import { useAuth } from '../../auth/model/useAuth'
import type { ProductFilter } from './productFilters'
import { useProductQuery } from './productQuery'

export function useProductCatalog() {
	const { user } = useAuth()
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const [favorites, setFavorites] = useState<{ ownerUid: string; productIds: number[] } | null>(null)
	const productQuery = useProductQuery(activeFilter)
	const favoriteIds = user && favorites?.ownerUid === user.uid
		? favorites.productIds
		: []

	function toggleFavorite(productId: number) {
		if (!user) {
			return
		}

		setFavorites((currentFavorites) => {
			const currentIds = currentFavorites?.ownerUid === user.uid
				? currentFavorites.productIds
				: []

			if (currentIds.includes(productId)) {
				return {
					ownerUid: user.uid,
					productIds: currentIds.filter((id) => id !== productId),
				}
			}

			return {
				ownerUid: user.uid,
				productIds: [...currentIds, productId],
			}
		})
	}

	return {
		activeFilter,
		error: productQuery.error,
		favoriteIds,
		isLoading: productQuery.isLoading,
		isUsingSampleProducts: productQuery.isUsingSampleProducts,
		products: productQuery.products,
		refetch: productQuery.refetch,
		setActiveFilter,
		toggleFavorite,
		visibleProducts: productQuery.visibleProducts,
	}
}
