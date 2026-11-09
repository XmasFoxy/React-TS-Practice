import { Link } from '@tanstack/react-router'
import { useCart } from '../cart/model/useCart'
import { useRequireAuth } from '../auth/model/useRequireAuth'
import { ProductCard } from '../catalog/components/ProductCard'
import { ProductCatalogNotice } from '../catalog/components/ProductCatalogNotice'
import { useProductCatalog } from '../catalog/model/useProductCatalog'

export function FavoritesPage() {
	const {
		error,
		favoriteIds,
		isLoading,
		isUsingSampleProducts,
		products,
		refetch,
		toggleFavorite,
	} = useProductCatalog()
	const { addToCart } = useCart()
	const requireAuth = useRequireAuth()
	const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id))

	return (
		<main className="store-page content-width">
			<div className="section-heading">
				<p className="eyebrow">Saved for a sweet moment</p>

				<h1>Your favorite flavors</h1>
			</div>

			<ProductCatalogNotice
				error={error}
				isLoading={isLoading}
				isUsingSampleProducts={isUsingSampleProducts}
				onRetry={() => {
					void refetch()
				}}
			/>

			{favoriteProducts.length > 0 ? (
				<div className="product-grid">
					{favoriteProducts.map((product) => (
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
			) : (
				<section className="favorites-empty">
					<h2>No favorite flavors yet</h2>

					<p>Tap the heart on any flavor in the shop to save it here.</p>

					<Link className="button button-pink" to="/catalog">
						Explore the shop
					</Link>
				</section>
			)}
		</main>
	)
}
