import { Outlet } from '@tanstack/react-router'
import { AuthProvider } from '../../features/auth/model/AuthProvider'
import { CartProvider } from '../../features/cart/model/CartProvider'
import { SiteFooter } from '../../shared/layout/SiteFooter'
import { SiteHeader } from '../../shared/layout/SiteHeader'
import '../styles.css'

export function RootLayout() {
	return (
		<AuthProvider>
			<CartProvider>
				<div className="storefront">
					<SiteHeader />

					<Outlet />

					<SiteFooter />
				</div>
			</CartProvider>
		</AuthProvider>
	)
}
