import { Link } from '@tanstack/react-router'
import cartIcon from '../assets/bag.svg'
import iceCreamLogo from '../assets/ice-cream-icon.svg'
import profileIcon from '../assets/profile.svg'
import searchIcon from '../assets/search-normal.svg'
import { useCart } from '../context/CartContext'

export function SiteHeader() {
	const { itemCount } = useCart()

	const cartLabel = itemCount === 1
		? 'Shopping bag, 1 item'
		: `Shopping bag, ${itemCount} items`

	return (
		<>
			<div className="announcement">
				Free delivery on orders over $50 <span>— Shop your favorite flavors</span>
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
					<Link to="/">Home</Link>
					<Link to="/catalog">Shop</Link>
					<Link to="/" hash="story">Our Story</Link>
					<Link to="/" hash="journal">Journal</Link>
					<Link to="/" hash="footer">Contact</Link>
				</nav>

				<div className="header-actions">
					<button className="icon-button" type="button" aria-label="Search">
						<img src={searchIcon} alt="" />
					</button>

					<Link className="icon-button account-button" to="/account" aria-label="Your account">
						<img src={profileIcon} alt="" />
					</Link>

					<Link className="cart-button" to="/cart" aria-label={cartLabel}>
						<img src={cartIcon} alt="" />
						<span className="cart-count">{itemCount}</span>
					</Link>
				</div>
			</header>
		</>
	)
}
