import { ProductCard } from '../../catalog/components/ProductCard'
import type { Product } from '../../../entities/product/products'
import arrowIcon from '../../../assets/arrow-right.svg'
import favoriteFlavorImage from '../../../assets/additions.png'
import blueberryNoteImage from '../../../assets/blueberry-ice.png'
import orangeNoteImage from '../../../assets/orange-ice-cream.png'
import colorfulIceCreamImage from '../../../assets/colorful-ice-cream.png'
import strawberryImage from '../../../assets/strawberry-ice-cream.png'
import strawberryNoteImage from '../../../assets/strawberry-ellipse.png'

type HomePromotionsSectionProps = {
	featuredProducts: Product[]
	favoriteIds: number[]
	onAddToCart: (productId: number) => void
	onToggleFavorite: (productId: number) => void
}

export function HomePromotionsSection({
	featuredProducts,
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
						src={colorfulIceCreamImage}
						alt="A colorful scoop of ice cream"
						loading="lazy"
					/>
				</article>
			</section>

			<section className="favorite-section content-width">
				<div className="section-heading favorite-heading">
					<p className="eyebrow">Favorite Flavor</p>

					<h2>Pastries In Addition To Ice Cream</h2>
				</div>

				<div className="favorite-image-wrap">
					<img
						src={favoriteFlavorImage}
						alt="A generous bowl of ice cream with sprinkles"
						loading="lazy"
					/>
				</div>

				<div className="favorite-copy">
					<div className="favorite-note">
						<img className="note-image" src={orangeNoteImage} alt="" />

						<div>
							<h3>Raspberry ripple</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>

					<div className="favorite-note">
						<img className="note-image" src={strawberryNoteImage} alt="" />

						<div>
							<h3>Pick your flavor</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>

					<div className="favorite-note">
						<img className="note-image" src={blueberryNoteImage} alt="" />

						<div>
							<h3>Bastani Sonnati</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>

					<div className="favorite-actions">
						<a className="button button-pink" href="#products">
							Find out more <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>

						<a className="button button-outline" href="#ingredients">
							Our Ingredients
						</a>
					</div>
				</div>
			</section>

			<section className="occasions-section">
				<div className="content-width">
					<div className="section-heading">
						<p className="eyebrow">A little joy for every day</p>

						<h2>Ice cream for every occasion</h2>
					</div>

					<div className="occasion-grid">
						{featuredProducts.map((product) => (
							<ProductCard
								isFavorite={favoriteIds.includes(product.id)}
								key={product.id}
								onAddToCart={() => onAddToCart(product.id)}
								onToggleFavorite={() => onToggleFavorite(product.id)}
								product={product}
								variant="featured"
							/>
						))}
					</div>

				</div>
			</section>
		</>
	)
}
