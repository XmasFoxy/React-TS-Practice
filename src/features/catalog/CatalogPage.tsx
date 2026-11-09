import { useProductCatalog } from './model/useProductCatalog'
import { ProductCard } from './components/ProductCard'
import { useCart } from '../cart/model/useCart'
import { useRequireAuth } from '../auth/model/useRequireAuth'
import { ProductCatalogNotice } from './components/ProductCatalogNotice'
import type { ProductFilter } from './model/productFilters'

const filters: { label: string; value: ProductFilter }[] = [
	{ label: 'Top Seller', value: 'all' },
	{ label: 'Top Trending', value: 'bestsellers' },
	{ label: 'New Products', value: 'new' },
]

export function CatalogPage() {
	const {
		activeFilter,
		error,
		favoriteIds,
		isLoading,
		isUsingSampleProducts,
		refetch,
		setActiveFilter,
		toggleFavorite,
		visibleProducts,
	} = useProductCatalog()
	const { addToCart } = useCart()
	const requireAuth = useRequireAuth()

	return (
		<main className="store-page mx-auto min-h-[60vh] w-[calc(100%-64px)] max-w-[1180px] py-[68px] pb-[84px] max-[650px]:w-[calc(100%-36px)] max-[650px]:max-w-[500px] max-[650px]:py-[48px] max-[650px]:pb-[60px]">
			<div className="section-heading">
				<p className="eyebrow">Scoop into something special</p>

				<h1>Our ice cream flavors</h1>
			</div>

			<ProductCatalogNotice
				error={error}
				isLoading={isLoading}
				isUsingSampleProducts={isUsingSampleProducts}
				onRetry={() => {
					void refetch()
				}}
			/>

			<div className="product-filters" aria-label="Filter products">
				{filters.map((filter) => (
					<button
						className={activeFilter === filter.value ? 'filter-button is-active' : 'filter-button'}
						key={filter.value}
						type="button"
						onClick={() => setActiveFilter(filter.value)}
					>
						{filter.label}
					</button>
				))}
			</div>

			<div className="product-grid grid grid-cols-4 gap-[18px] max-[650px]:grid-cols-2 max-[650px]:gap-[11px] max-[370px]:gap-2">
				{visibleProducts.map((product) => (
					<ProductCard
						isFavorite={favoriteIds.includes(product.id)}
						key={product.id}
						onAddToCart={() => {
							if (!requireAuth()) {
								return false
							}

							addToCart(product.id)
							return true
						}}
						onToggleFavorite={() => {
							if (requireAuth()) {
								toggleFavorite(product.id)
							}
						}}
						product={product}
					/>
				))}
			</div>
		</main>
	)
}
