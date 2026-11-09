import { Link } from '@tanstack/react-router'
import cartIcon from '../../assets/bag.svg'
import favoriteIcon from '../../assets/Vector.svg'
import iceCreamLogo from '../../assets/ice-cream-icon.svg'
import profileIcon from '../../assets/profile.svg'
import { useCart } from '../../features/cart/model/useCart'

export function SiteHeader() {
	const { itemCount } = useCart()

	const cartLabel = itemCount === 1
		? 'Shopping bag, 1 item'
		: `Shopping bag, ${itemCount} items`

	return (
		<>
			<div className="announcement">
				<div className="announcement-copy">
					<span>Free shipping on orders over $50</span>

					<span>Subscribe &amp; get 15% off + FREE shipping</span>
				</div>

				<div className="announcement-actions">
					<Link className="announcement-icon-link" to="/account" aria-label="Your account">
						<img src={profileIcon} alt="" />
					</Link>

					<Link className="announcement-icon-link" to="/favorites" aria-label="Your favorites">
						<img src={favoriteIcon} alt="" />
					</Link>

					<Link className="announcement-icon-link announcement-cart" to="/cart" aria-label={cartLabel}>
						<img src={cartIcon} alt="" />
						<span className="cart-count">{itemCount}</span>
					</Link>
				</div>
			</div>

			<header className="site-header">
				<Link className="brand" to="/" aria-label="Cuisine Ice Cream home">
					<span className="brand-icon" aria-hidden="true">
						<img src={iceCreamLogo} alt="" />
					</span>

					<span className="brand-name">
						Cuisine
						<strong>Ice Cream</strong>
					</span>
				</Link>

				<nav className="main-navigation" aria-label="Main navigation">
					<Link className="navigation-home" to="/">
						Home
					</Link>
					<Link to="/" hash="story">Our Story</Link>
					<Link to="/catalog">Shop</Link>
					<Link to="/" hash="journal">Blog</Link>
					<Link to="/" hash="footer">Contact</Link>
				</nav>
			</header>
		</>
	)
}
