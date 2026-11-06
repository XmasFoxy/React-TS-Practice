import { useProductCatalog } from './model/useProductCatalog'
import { ProductCard } from './components/ProductCard'
import { useCart } from '../cart/model/useCart'
import type { ProductFilter } from './model/productFilters'

const filters: { label: string; value: ProductFilter }[] = [
	{ label: 'Top Seller', value: 'all' },
	{ label: 'Top Trending', value: 'bestsellers' },
	{ label: 'New Products', value: 'new' },
]

export function CatalogPage() {
	const {
		activeFilter,
		favoriteIds,
		setActiveFilter,
		toggleFavorite,
		visibleProducts,
	} = useProductCatalog()
	const { addToCart } = useCart()

	return (
		<main className="store-page content-width">
			<div className="section-heading">
				<p className="eyebrow">Scoop into something special</p>

				<h1>Our ice cream flavors</h1>
			</div>

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

			<div className="product-grid">
				{visibleProducts.map((product) => (
					<ProductCard
						isFavorite={favoriteIds.includes(product.id)}
						key={product.id}
						onAddToCart={() => addToCart(product.id)}
						onToggleFavorite={() => toggleFavorite(product.id)}
						product={product}
					/>
				))}
			</div>
		</main>
	)
}
