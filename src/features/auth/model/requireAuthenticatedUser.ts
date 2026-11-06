import { getFirebaseAuth } from './firebase'

export async function getAuthenticatedUser() {
	const auth = getFirebaseAuth()

	if (!auth) {
		return null
	}

	await auth.authStateReady()

	return auth.currentUser
}
