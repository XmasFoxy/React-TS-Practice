import { Link } from '@tanstack/react-router'
import iceCreamLogo from '../assets/ice-cream-icon.svg'

export function SiteFooter() {
	return (
		<footer className="site-footer" id="footer">
			<div className="footer-main content-width">
				<div className="footer-brand">
					<Link className="brand brand-light" to="/">
						<span className="brand-icon" aria-hidden="true">
							<img src={iceCreamLogo} alt="" />
						</span>

						<span className="brand-name">
							Cuisine
							<strong>Ice Cream</strong>
						</span>
					</Link>

					<p>Small-batch scoops, made with love and the good stuff.</p>
				</div>

				<a className="footer-email" href="mailto:hello@cuisineicecream.example">
					hello@cuisineicecream.example
				</a>
			</div>

			<div className="footer-bottom content-width">
				<p>© 2025 Cuisine Ice Cream. Made with love.</p>
			</div>
		</footer>
	)
}
