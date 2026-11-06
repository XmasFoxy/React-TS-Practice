import { useLocation, useRouter } from '@tanstack/react-router'
import { useAuth } from './useAuth'

export function useRequireAuth() {
	const { user, status } = useAuth()
	const router = useRouter()
	const currentLocation = useLocation({
		select: (location) => location.href,
	})

	return function requireAuth() {
		if (user) {
			return true
		}

		if (status !== 'loading') {
			void router.navigate({
				to: '/login',
				search: {
					redirect: currentLocation,
				},
			})
		}

		return false
	}
}
