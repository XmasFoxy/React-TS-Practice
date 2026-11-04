import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

export const Route = createFileRoute('/cart')({
	component: CartPage,
})

function CartPage() {
	const { items, itemCount, removeFromCart, updateQuantity } = useCart()

	const cartItems = items.flatMap((item) => {
		const product = products.find((currentProduct) => currentProduct.id === item.productId)

		if (!product) {
			return []
		}

		return [{ ...item, product }]
	})

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0,
	)

	return (
		<main className="cart-page content-width">
			<div className="section-heading">
				<p className="eyebrow">A little scoop of happiness</p>

				<h1>Your shopping bag</h1>
			</div>

			{cartItems.length === 0 ? (
				<div className="empty-cart">
					<h2>Your bag is waiting for a treat</h2>

					<p>Add your favorite flavors and they will appear here.</p>

					<Link className="button button-pink" to="/catalog">
						Explore our flavors
					</Link>
				</div>
			) : (
				<div className="cart-content">
					<div className="cart-items">
						{cartItems.map((item) => (
							<article className="cart-item" key={item.product.id}>
								<img src={item.product.image} alt={item.product.name} />

								<div className="cart-item-details">
									<h2>{item.product.name}</h2>

									<p>${item.product.price.toFixed(2)} each</p>

									<div className="quantity-control">
										<button
											type="button"
											onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
											aria-label={`Decrease ${item.product.name} quantity`}
										>
											-
										</button>

										<span>{item.quantity}</span>

										<button
											type="button"
											onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
											aria-label={`Increase ${item.product.name} quantity`}
										>
											+
										</button>
									</div>

									<button
										className="remove-cart-item"
										type="button"
										onClick={() => removeFromCart(item.product.id)}
									>
										Remove
									</button>
								</div>

								<strong className="cart-item-total">
									${(item.product.price * item.quantity).toFixed(2)}
								</strong>
							</article>
						))}
					</div>

					<aside className="cart-summary">
						<h2>Order summary</h2>

						<p>
							<span>Items</span>
							<span>{itemCount}</span>
						</p>

						<p className="cart-total">
							<span>Total</span>
							<strong>${totalPrice.toFixed(2)}</strong>
						</p>

						<p className="cart-checkout-note">
							Sign-in and saved orders will be connected with Firebase in
							the next project step.
						</p>
					</aside>
				</div>
			)}
		</main>
	)
}
