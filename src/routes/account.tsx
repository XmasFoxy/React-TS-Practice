import { createFileRoute, redirect } from '@tanstack/react-router'
import { AccountPage } from '../features/account/AccountPage'
import { getAuthenticatedUser } from '../features/auth/model/requireAuthenticatedUser'

export const Route = createFileRoute('/account')({
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

		return { user }
	},
	component: function AccountRoute() {
		const { user } = Route.useRouteContext()

		return <AccountPage user={user} />
	},
})
