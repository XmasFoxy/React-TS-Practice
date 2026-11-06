import { useState } from 'react'
import { products } from '../../../entities/product/products'
import { useAuth } from '../../auth/model/useAuth'
import type { ProductFilter } from './productFilters'

export function useProductCatalog() {
	const { user } = useAuth()
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const [favorites, setFavorites] = useState<{ ownerUid: string; productIds: number[] } | null>(null)
	const favoriteIds = user && favorites?.ownerUid === user.uid
		? favorites.productIds
		: []

	const visibleProducts = products.filter((product) => {
		if (activeFilter === 'new') {
			return product.isNew
		}

		if (activeFilter === 'bestsellers') {
			return product.isBestseller
		}

		return true
	})

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
		favoriteIds,
		setActiveFilter,
		toggleFavorite,
		visibleProducts,
	}
}
