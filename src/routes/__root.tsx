import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { CartProvider } from '../context/CartContext'
import '../App.css'

function RootLayout() {
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

export const Route = createRootRoute({
	component: RootLayout,
})
