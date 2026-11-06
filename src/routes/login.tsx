import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '../features/auth/components/AuthPage'
import { validateAuthSearch } from '../features/auth/model/authSearch'

export const Route = createFileRoute('/login')({
	validateSearch: validateAuthSearch,
	component: function LoginPage() {
		const { redirect } = Route.useSearch()

		return <AuthPage mode="login" redirect={redirect} />
	},
})
