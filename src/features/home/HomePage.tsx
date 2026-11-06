import { useCart } from '../cart/model/useCart'
import { useProductCatalog } from '../catalog/model/useProductCatalog'
import { HomeCatalogSection } from './components/HomeCatalogSection'
import { HomeIntro } from './components/HomeIntro'
import { HomeJournalSection } from './components/HomeJournalSection'
import { HomePromotionsSection } from './components/HomePromotionsSection'

export function HomePage() {
	const productCatalog = useProductCatalog()
	const { addToCart } = useCart()

	return (
		<main className="home-page">
			<HomeIntro />

			<HomeCatalogSection
				activeFilter={productCatalog.activeFilter}
				favoriteIds={productCatalog.favoriteIds}
				onAddToCart={addToCart}
				onSelectFilter={productCatalog.setActiveFilter}
				onToggleFavorite={productCatalog.toggleFavorite}
				visibleProducts={productCatalog.visibleProducts}
			/>

			<HomePromotionsSection
				favoriteIds={productCatalog.favoriteIds}
				onAddToCart={addToCart}
				onToggleFavorite={productCatalog.toggleFavorite}
			/>

			<HomeJournalSection />
		</main>
	)
}
