import { useCart } from '../cart/model/useCart'
import { useRequireAuth } from '../auth/model/useRequireAuth'
import { useProductCatalog } from '../catalog/model/useProductCatalog'
import { HomeCatalogSection } from './components/HomeCatalogSection'
import { HomeIntro } from './components/HomeIntro'
import { HomeJournalSection } from './components/HomeJournalSection'
import { HomePromotionsSection } from './components/HomePromotionsSection'

export function HomePage() {
	const productCatalog = useProductCatalog()
	const { addToCart } = useCart()
	const requireAuth = useRequireAuth()

	return (
		<main className="home-page">
			<HomeIntro />

			<HomeCatalogSection
				activeFilter={productCatalog.activeFilter}
				error={productCatalog.error}
				favoriteIds={productCatalog.favoriteIds}
				isLoading={productCatalog.isLoading}
				isUsingSampleProducts={productCatalog.isUsingSampleProducts}
				onAddToCart={(productId) => {
					if (requireAuth()) {
						addToCart(productId)
					}
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
				visibleProducts={productCatalog.visibleProducts.slice(0, 8)}
			/>

			<HomePromotionsSection
				featuredProducts={productCatalog.products.slice(0, 4)}
				favoriteIds={productCatalog.favoriteIds}
				onAddToCart={(productId) => {
					if (requireAuth()) {
						addToCart(productId)
					}
				}}
				onToggleFavorite={(productId) => {
					if (requireAuth()) {
						productCatalog.toggleFavorite(productId)
					}
				}}
			/>

			<HomeJournalSection />
		</main>
	)
}
