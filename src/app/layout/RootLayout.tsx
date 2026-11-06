import { Outlet } from '@tanstack/react-router'
import { CartProvider } from '../../features/cart/model/CartProvider'
import { SiteFooter } from '../../shared/layout/SiteFooter'
import { SiteHeader } from '../../shared/layout/SiteHeader'
import '../../App.css'

export function RootLayout() {
	return (
		<CartProvider>
			<div className="storefront">
				<SiteHeader />

				<Outlet />

				<SiteFooter />
			</div>
		</CartProvider>
	)
}
