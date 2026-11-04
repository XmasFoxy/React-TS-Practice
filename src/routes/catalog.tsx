import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { products, type ProductFilter } from '../data/products'

export const Route = createFileRoute('/catalog')({
	component: CatalogPage,
})

function CatalogPage() {
	const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
	const [favoriteIds, setFavoriteIds] = useState<number[]>([])
	const { addToCart } = useCart()

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

	return (
		<main className="store-page content-width">
			<div className="section-heading">
				<p className="eyebrow">Scoop into something special</p>

				<h1>Our ice cream flavors</h1>
			</div>

			<div className="product-filters" aria-label="Filter products">
				<button
					className={activeFilter === 'all' ? 'filter-button is-active' : 'filter-button'}
					type="button"
					onClick={() => setActiveFilter('all')}
				>
					Our favorites
				</button>

				<button
					className={activeFilter === 'new' ? 'filter-button is-active' : 'filter-button'}
					type="button"
					onClick={() => setActiveFilter('new')}
				>
					New arrivals
				</button>

				<button
					className={activeFilter === 'bestsellers' ? 'filter-button is-active' : 'filter-button'}
					type="button"
					onClick={() => setActiveFilter('bestsellers')}
				>
					Best sellers
				</button>
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
