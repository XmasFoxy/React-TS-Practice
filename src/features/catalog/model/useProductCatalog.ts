import { useState } from 'react'
import { useFavorites } from '../../favorites/model/useFavorites'
import type { ProductFilter } from './productFilters'
import { useProductQuery } from './productQuery'

export function useProductCatalog() {
	const { favoriteIds, toggleFavorite } = useFavorites()
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const productQuery = useProductQuery(activeFilter)

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
