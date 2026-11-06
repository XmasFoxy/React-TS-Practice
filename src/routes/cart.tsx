import { createFileRoute, redirect } from '@tanstack/react-router'
import { CartPage } from '../features/cart/CartPage'
import { getAuthenticatedUser } from '../features/auth/model/requireAuthenticatedUser'

export const Route = createFileRoute('/cart')({
	beforeLoad: async ({ location }) => {
		const user = await getAuthenticatedUser()

		if (!user) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.href,
				},
			})
		}
	},
	component: CartPage,
})
