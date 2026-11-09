import { Link } from '@tanstack/react-router'
import { useCart } from '../cart/model/useCart'
import { useRequireAuth } from '../auth/model/useRequireAuth'
import { ProductCard } from '../catalog/components/ProductCard'
import { ProductCatalogNotice } from '../catalog/components/ProductCatalogNotice'
import { useProductCatalog } from '../catalog/model/useProductCatalog'
import { useFavorites } from './model/useFavorites'

export function FavoritesPage() {
	const {
		error: productError,
		favoriteError,
		favoriteIds,
		isLoading,
		isUsingSampleProducts,
		products,
		ratingError,
		ratingPendingProductId,
		rateProduct,
		refetch,
		toggleFavorite,
	} = useProductCatalog()
	const { error: favoritesError, isLoading: isFavoritesLoading } = useFavorites()
	const { addToCart, error: cartError } = useCart()
	const requireAuth = useRequireAuth()
	const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id))

	return (
		<main className="store-page mx-auto min-h-[60vh] w-[calc(100%-64px)] max-w-[1180px] py-[68px] pb-[84px] max-[650px]:w-[calc(100%-36px)] max-[650px]:max-w-[500px] max-[650px]:py-[48px] max-[650px]:pb-[60px]">
			<div className="section-heading">
				<p className="eyebrow">Saved for a sweet moment</p>

				<h1>Your favorite flavors</h1>
			</div>

			<ProductCatalogNotice
				error={productError}
				isLoading={isLoading}
				isUsingSampleProducts={isUsingSampleProducts}
				onRetry={() => {
					void refetch()
				}}
			/>

			{cartError || favoritesError || favoriteError || ratingError ? (
				<p className="auth-message auth-message-error" role="alert">
					{cartError ?? favoritesError ?? favoriteError ?? ratingError}
				</p>
			) : null}

			{isFavoritesLoading || isLoading ? (
				<p className="catalog-notice" role="status">Loading your saved favorites...</p>
			) : favoriteProducts.length > 0 ? (
				<div className="product-grid grid grid-cols-4 gap-[18px] max-[650px]:grid-cols-2 max-[650px]:gap-[11px] max-[370px]:gap-2">
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
							onRateProduct={(rating) => {
								if (requireAuth()) {
									rateProduct(product.id, rating)
								}
							}}
							isRatingPending={ratingPendingProductId === product.id}
							product={product}
						/>
					))}
				</div>
			) : (
				<section className="grid min-h-[230px] justify-items-center content-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-7 text-center">
					<h2 className="m-0 text-xl">No favorite flavors yet</h2>

					<p className="m-0 text-[13px] text-[var(--color-muted)]">
						Tap the heart on any flavor in the shop to save it here.
					</p>

					<Link className="button button-pink" to="/catalog">
						Explore the shop
					</Link>
				</section>
			)}
		</main>
	)
}
