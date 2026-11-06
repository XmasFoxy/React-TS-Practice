import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '../features/auth/components/AuthPage'
import { validateAuthSearch } from '../features/auth/model/authSearch'

export const Route = createFileRoute('/register')({
	validateSearch: validateAuthSearch,
	component: function RegisterPage() {
		const { redirect } = Route.useSearch()

		return <AuthPage mode="register" redirect={redirect} />
	},
})
