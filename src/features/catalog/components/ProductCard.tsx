import { useEffect, useRef, useState } from 'react'
import cartIcon from '../../../assets/shopping-cart.svg'
import type { Product } from '../../../entities/product/products'

type ProductCardProps = {
	isFavorite: boolean
	onAddToCart: () => boolean
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
	const [isAdded, setIsAdded] = useState(false)
	const feedbackTimeout = useRef<number | null>(null)

	useEffect(() => () => {
		if (feedbackTimeout.current !== null) {
			window.clearTimeout(feedbackTimeout.current)
		}
	}, [])

	function handleAddToCart() {
		if (!onAddToCart()) {
			return
		}

		setIsAdded(true)

		if (feedbackTimeout.current !== null) {
			window.clearTimeout(feedbackTimeout.current)
		}

		feedbackTimeout.current = window.setTimeout(() => {
			setIsAdded(false)
			feedbackTimeout.current = null
		}, 900)
	}

	return (
		<article
			className={[
				'product-card group flex min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_5px_18px_rgba(52,35,31,0.08)]',
				product.isSoldOut ? 'is-sold-out' : '',
				variant === 'featured' ? 'product-card-featured' : '',
			].filter(Boolean).join(' ')}
		>
			<div
				className={[
					'product-image-wrap relative aspect-square shrink-0 overflow-hidden bg-white',
					product.imageKey === 'maca' ? 'product-image-wrap-maca' : '',
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

				<img
					className={[
						'block size-full object-contain transition-transform duration-300 group-hover:scale-[1.03]',
						product.imageKey === 'maca'
							? 'scale-[1.08] object-cover group-hover:scale-[1.12]'
							: '',
					].filter(Boolean).join(' ')}
					src={product.image}
					alt={product.name}
					loading="lazy"
				/>
			</div>

			<div className="product-details flex flex-1 flex-col p-[12px_13px_13px] max-[650px]:p-[10px]">
				<div
					className="product-rating"
					role="img"
					aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
				>
					{Array.from({ length: 5 }, (_, index) => {
						const fill = Math.max(0, Math.min(1, product.rating - index)) * 100

						return (
							<span className="product-rating-star" key={index} aria-hidden="true">
								★
								<span
									className="product-rating-star-fill"
									style={{ width: `${fill}%` }}
								>
									★
								</span>
							</span>
						)
					})}
				</div>

				<h3>{product.name}</h3>

				<div className="mt-auto flex items-center justify-between pt-[9px]">
					<span className="product-price">${product.price.toFixed(2)}</span>

					<button
						className={isAdded ? 'add-to-cart-button is-added' : 'add-to-cart-button'}
						disabled={product.isSoldOut}
						type="button"
						onClick={handleAddToCart}
						aria-label={
							product.isSoldOut
								? `${product.name} is sold out`
								: isAdded
									? `${product.name} added. Add another`
									: `Add ${product.name} to shopping bag`
						}
					>
						{isAdded ? '✓' : <img src={cartIcon} alt="" />}
					</button>

					<span className="visually-hidden" role="status" aria-live="polite">
						{isAdded ? `${product.name} added to cart` : ''}
					</span>
				</div>
			</div>
		</article>
	)
}
