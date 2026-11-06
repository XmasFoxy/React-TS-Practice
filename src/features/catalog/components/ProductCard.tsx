import starIcon from '../../../assets/Star 1.svg'
import type { Product } from '../../../entities/product/products'

type ProductCardProps = {
	isFavorite: boolean
	onAddToCart: () => void
	onToggleFavorite: () => void
	product: Product
}

export function ProductCard({
	isFavorite,
	onAddToCart,
	onToggleFavorite,
	product,
}: ProductCardProps) {
	return (
		<article className={product.isSoldOut ? 'product-card is-sold-out' : 'product-card'}>
			<div className="product-image-wrap">
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
					<span className="heart-icon" aria-hidden="true" />
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
						{product.isSoldOut ? '-' : '+'}
					</button>
				</div>
			</div>
		</article>
	)
}
