import { useCart } from '../cart/model/useCart'
import { useRequireAuth } from '../auth/model/useRequireAuth'
import { useProductCatalog } from '../catalog/model/useProductCatalog'
import { HomeCatalogSection } from './components/HomeCatalogSection'
import { HomeIntro } from './components/HomeIntro'
import { HomeJournalSection } from './components/HomeJournalSection'
import { HomePromotionsSection } from './components/HomePromotionsSection'

export function HomePage() {
	const productCatalog = useProductCatalog()
	const { addToCart, error: cartError } = useCart()
	const requireAuth = useRequireAuth()

	return (
		<main className="home-page">
			<HomeIntro />

			<HomeCatalogSection
				activeFilter={productCatalog.activeFilter}
				cartError={cartError}
				error={productCatalog.error}
				favoriteIds={productCatalog.favoriteIds}
				favoriteError={productCatalog.favoriteError}
				isLoading={productCatalog.isLoading}
				isUsingSampleProducts={productCatalog.isUsingSampleProducts}
				ratingError={productCatalog.ratingError}
				ratingPendingProductId={productCatalog.ratingPendingProductId}
				onAddToCart={(productId) => {
					if (!requireAuth()) {
						return false
					}

					addToCart(productId)
					return true
				}}
				onSelectFilter={productCatalog.setActiveFilter}
				onRetry={() => {
					void productCatalog.refetch()
				}}
				onToggleFavorite={(productId) => {
					if (requireAuth()) {
						productCatalog.toggleFavorite(productId)
					}
				}}
				onRateProduct={(productId, rating) => {
					if (requireAuth()) {
						productCatalog.rateProduct(productId, rating)
					}
				}}
				visibleProducts={productCatalog.visibleProducts.slice(0, 8)}
			/>

			<HomePromotionsSection
				featuredProducts={productCatalog.products.slice(0, 4)}
				favoriteIds={productCatalog.favoriteIds}
				ratingPendingProductId={productCatalog.ratingPendingProductId}
				onAddToCart={(productId) => {
					if (!requireAuth()) {
						return false
					}

					addToCart(productId)
					return true
				}}
				onToggleFavorite={(productId) => {
					if (requireAuth()) {
						productCatalog.toggleFavorite(productId)
					}
				}}
				onRateProduct={(productId, rating) => {
					if (requireAuth()) {
						productCatalog.rateProduct(productId, rating)
					}
				}}
			/>

			<HomeJournalSection />
		</main>
	)
}
