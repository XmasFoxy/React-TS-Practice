import starIcon from '../../../assets/Star 1.svg'
import cartIcon from '../../../assets/shopping-cart.svg'
import type { Product } from '../../../entities/product/products'

type ProductCardProps = {
	isFavorite: boolean
	onAddToCart: () => void
	onToggleFavorite: () => void
	product: Product
	variant?: 'default' | 'featured'
}

export function ProductCard({
	isFavorite,
	onAddToCart,
	onToggleFavorite,
	product,
	variant = 'default',
}: ProductCardProps) {
	return (
		<article
			className={[
				'product-card',
				product.isSoldOut ? 'is-sold-out' : '',
				variant === 'featured' ? 'product-card-featured' : '',
			].filter(Boolean).join(' ')}
		>
			<div
				className={[
					'product-image-wrap',
					['assortedScoops', 'dessertSelection', 'maca'].includes(product.imageKey)
						? 'product-image-wrap-portrait'
						: '',
				].filter(Boolean).join(' ')}
			>
				{product.badge && (
					<span className={`product-badge ${product.badgeTone ?? ''}`}>
						{product.badge}
					</span>
				)}

				<button
					className={isFavorite ? 'favorite-button is-favorite' : 'favorite-button'}
					type="button"
					onClick={onToggleFavorite}
					aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
					aria-pressed={isFavorite}
				>
					<svg
						className="heart-icon"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
					</svg>
				</button>

				<img src={product.image} alt={product.name} loading="lazy" />
			</div>

			<div className="product-details">
				<div className="product-rating" aria-label="Rated 5 out of 5">
					{Array.from({ length: 5 }, (_, index) => (
						<img src={starIcon} alt="" key={index} />
					))}
				</div>

				<h3>{product.name}</h3>

				<div className="product-buy-row">
					<span className="product-price">${product.price.toFixed(2)}</span>

					<button
						className="add-to-cart-button"
						disabled={product.isSoldOut}
						type="button"
						onClick={onAddToCart}
						aria-label={product.isSoldOut ? `${product.name} is sold out` : `Add ${product.name} to shopping bag`}
					>
						<img src={cartIcon} alt="" />
					</button>
				</div>
			</div>
		</article>
	)
}
