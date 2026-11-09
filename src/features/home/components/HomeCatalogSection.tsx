import { Link } from '@tanstack/react-router'
import type { Product } from '../../../entities/product/products'
import { flavors } from '../../../entities/product/products'
import { ProductCard } from '../../catalog/components/ProductCard'
import { ProductCatalogNotice } from '../../catalog/components/ProductCatalogNotice'
import type { ProductFilter } from '../../catalog/model/productFilters'
import arrowIcon from '../../../assets/arrow-right.svg'

type HomeCatalogSectionProps = {
	activeFilter: ProductFilter
	favoriteIds: number[]
	error: string | null
	isLoading: boolean
	isUsingSampleProducts: boolean
	onAddToCart: (productId: number) => boolean
	onSelectFilter: (filter: ProductFilter) => void
	onRetry: () => void
	onToggleFavorite: (productId: number) => void
	visibleProducts: Product[]
}

const filters: { label: string; value: ProductFilter }[] = [
	{ label: 'Top Seller', value: 'all' },
	{ label: 'Top Trending', value: 'bestsellers' },
	{ label: 'New Products', value: 'new' },
]

export function HomeCatalogSection({
	activeFilter,
	error,
	favoriteIds,
	isLoading,
	isUsingSampleProducts,
	onAddToCart,
	onSelectFilter,
	onRetry,
	onToggleFavorite,
	visibleProducts,
}: HomeCatalogSectionProps) {
	return (
		<>
			<section className="ingredients-section content-width" id="ingredients">
				<div className="section-heading">
					<p className="eyebrow">Nothing artificial, ever</p>

					<h2>Our Natural Ingredients</h2>
				</div>

				<ProductCatalogNotice
					error={error}
					isLoading={isLoading}
					isUsingSampleProducts={isUsingSampleProducts}
					onRetry={onRetry}
				/>

				<div className="flavor-list">
					{flavors.map((flavor) => (
						<a className="flavor-item" href="#products" key={flavor.name}>
							<img src={flavor.image} alt="" loading="lazy" />

							<span>{flavor.name}</span>
						</a>
					))}
				</div>

			</section>

			<section className="products-section" id="products">
				<div className="content-width">
					<div className="section-heading">
						<p className="eyebrow">Scoop into something special</p>

						<h2>Find Your Perfect Pint!</h2>
					</div>

					<div className="product-filters" aria-label="Filter products">
						{filters.map((filter) => (
							<button
								className={activeFilter === filter.value ? 'filter-button is-active' : 'filter-button'}
								key={filter.value}
								type="button"
								onClick={() => onSelectFilter(filter.value)}
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
								onAddToCart={() => onAddToCart(product.id)}
								onToggleFavorite={() => onToggleFavorite(product.id)}
								product={product}
							/>
						))}
					</div>

					<Link className="button button-pink products-cta" to="/catalog">
						View All Products <img className="arrow-icon" src={arrowIcon} alt="" />
					</Link>
				</div>
			</section>
		</>
	)
}
