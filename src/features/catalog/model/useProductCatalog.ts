import { useState } from 'react'
import { products } from '../../../entities/product/products'
import type { ProductFilter } from './productFilters'

export function useProductCatalog() {
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const [favoriteIds, setFavoriteIds] = useState<number[]>([])

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
		setFavoriteIds((currentIds) => {
			if (currentIds.includes(productId)) {
				return currentIds.filter((id) => id !== productId)
			}

			return [...currentIds, productId]
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
