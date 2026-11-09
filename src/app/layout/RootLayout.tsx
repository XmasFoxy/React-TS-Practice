import { Outlet } from '@tanstack/react-router'
import { AuthProvider } from '../../features/auth/model/AuthProvider'
import { CartProvider } from '../../features/cart/model/CartProvider'
import { FavoritesProvider } from '../../features/favorites/model/FavoritesProvider'
import { SiteFooter } from '../../shared/layout/SiteFooter'
import { SiteHeader } from '../../shared/layout/SiteHeader'
import '../styles.css'

export function RootLayout() {
	return (
		<AuthProvider>
			<FavoritesProvider>
				<CartProvider>
					<div className="storefront">
						<SiteHeader />

						<Outlet />

						<SiteFooter />
					</div>
				</CartProvider>
			</FavoritesProvider>
		</AuthProvider>
	)
}
