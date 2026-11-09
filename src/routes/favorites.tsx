import { createFileRoute, redirect } from '@tanstack/react-router'
import { FavoritesPage } from '../features/favorites/FavoritesPage'
import { getAuthenticatedUser } from '../features/auth/model/requireAuthenticatedUser'

export const Route = createFileRoute('/favorites')({
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
	component: FavoritesPage,
})
