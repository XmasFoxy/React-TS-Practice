import { ProductCard } from '../../catalog/components/ProductCard'
import { products } from '../../../entities/product/products'
import arrowIcon from '../../../assets/arrow-right.svg'
import dessertsImage from '../../../assets/desserts.png'
import purpleIceCreamImage from '../../../assets/purple-ice-cream.png'
import strawberryImage from '../../../assets/strawberry-ice-cream.png'
import strawberryNoteImage from '../../../assets/strawberry-ellipse.png'
import vanillaNoteImage from '../../../assets/raspberry-ice-cream.png'

type HomePromotionsSectionProps = {
	favoriteIds: number[]
	onAddToCart: (productId: number) => void
	onToggleFavorite: (productId: number) => void
}

export function HomePromotionsSection({
	favoriteIds,
	onAddToCart,
	onToggleFavorite,
}: HomePromotionsSectionProps) {
	return (
		<>
			<section className="promotions-section content-width" aria-label="Current promotions">
				<article className="promotion-card promotion-green">
					<div className="promotion-copy">
						<p>100% natural</p>

						<h2>All you want!</h2>

						<span>Smooth & refreshing, intensely flavorful, 100% dairy free.</span>

						<a className="button button-dark" href="#products">
							Shop now <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>

					<img
						src={strawberryImage}
						alt="Strawberry ice cream with fresh berries"
						loading="lazy"
					/>
				</article>

				<article className="promotion-card promotion-orange">
					<div className="promotion-copy">
						<p>Free shipping</p>

						<h2>25% save off</h2>

						<span>Same day delivery for orders placed before 4:30 PM.</span>

						<a className="button button-orange" href="#products">
							Shop now <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>

					<img
						src={purpleIceCreamImage}
						alt="A colorful scoop of ice cream"
						loading="lazy"
					/>
				</article>
			</section>

			<section className="favorite-section content-width">
				<div className="favorite-image-wrap">
					<img
						src={dessertsImage}
						alt="A generous bowl of ice cream with sprinkles"
						loading="lazy"
					/>
				</div>

				<div className="favorite-copy">
					<p className="eyebrow">A favorite flavor</p>

					<h2>Pastries in addition to ice cream</h2>

					<p>
						Our favorite flavors are inspired by the little things that
						make every day sweeter.
					</p>

					<div className="favorite-note">
						<img className="note-image" src={vanillaNoteImage} alt="" />

						<div>
							<h3>Raspberry ripple</h3>
							<p>Sweet berries, swirled through a creamy scoop.</p>
						</div>
					</div>

					<div className="favorite-note">
						<img className="note-image" src={strawberryNoteImage} alt="" />

						<div>
							<h3>Pick your flavor</h3>
							<p>Discover a new favorite from our seasonal menu.</p>
						</div>
					</div>

					<a className="text-link" href="#products">
						Explore our menu <img className="arrow-icon" src={arrowIcon} alt="" />
					</a>
				</div>
			</section>

			<section className="occasions-section">
				<div className="content-width">
					<div className="section-heading">
						<p className="eyebrow">A little joy for every day</p>

						<h2>Ice cream for every occasion</h2>
					</div>

					<div className="occasion-grid">
						{products.slice(1, 5).map((product) => (
							<ProductCard
								isFavorite={favoriteIds.includes(product.id)}
								key={product.id}
								onAddToCart={() => onAddToCart(product.id)}
								onToggleFavorite={() => onToggleFavorite(product.id)}
								product={product}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
