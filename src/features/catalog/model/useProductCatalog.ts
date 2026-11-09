import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductRatingErrorMessage, saveProductRating } from '../../../entities/product/productService'
import { useFavorites } from '../../favorites/model/useFavorites'
import { useAuth } from '../../auth/model/useAuth'
import type { ProductFilter } from './productFilters'
import { useProductQuery } from './productQuery'

export function useProductCatalog() {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const {
		error: favoriteError,
		favoriteIds,
		toggleFavorite,
	} = useFavorites()
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const productQuery = useProductQuery(activeFilter)
	const ratingMutation = useMutation({
		mutationFn: ({ productId, rating }: { productId: number; rating: number }) => {
			if (!user) {
				throw new Error('You must be signed in to rate a product.')
			}

			return saveProductRating(productId, user.uid, rating)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
	})

	return {
		activeFilter,
		error: productQuery.error,
		favoriteIds,
		favoriteError,
		isLoading: productQuery.isLoading,
		isUsingSampleProducts: productQuery.isUsingSampleProducts,
		products: productQuery.products,
		ratingError: ratingMutation.error
			? getProductRatingErrorMessage(ratingMutation.error)
			: null,
		ratingPendingProductId: ratingMutation.isPending
			? ratingMutation.variables.productId
			: null,
		rateProduct: (productId: number, rating: number) => ratingMutation.mutate({ productId, rating }),
		refetch: productQuery.refetch,
		setActiveFilter,
		toggleFavorite,
		visibleProducts: productQuery.visibleProducts,
	}
}
