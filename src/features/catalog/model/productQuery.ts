import { useQuery } from '@tanstack/react-query'
import { isFirebaseConfigured } from '../../auth/model/firebase'
import { getProductLoadErrorMessage, getProductsFromFirestore } from '../../../entities/product/productService'
import { products as sampleProducts } from '../../../entities/product/products'
import type { ProductFilter } from './productFilters'

export const productsQueryKey = ['products'] as const

export function useProductQuery(activeFilter: ProductFilter) {
	const query = useQuery({
		queryKey: productsQueryKey,
		queryFn: getProductsFromFirestore,
		enabled: isFirebaseConfigured(),
		retry: false,
	})
	const hasFirestoreProducts = (query.data?.length ?? 0) > 0
	const products = hasFirestoreProducts ? query.data ?? [] : sampleProducts
	const visibleProducts = products.filter((product) => {
		if (activeFilter === 'new') {
			return product.isNew
		}

		if (activeFilter === 'bestsellers') {
			return product.isBestseller
		}

		return true
	})

	return {
		error: query.isError ? getProductLoadErrorMessage(query.error) : null,
		isLoading: query.isPending && isFirebaseConfigured(),
		isUsingSampleProducts: !hasFirestoreProducts,
		products,
		refetch: query.refetch,
		visibleProducts,
	}
}
