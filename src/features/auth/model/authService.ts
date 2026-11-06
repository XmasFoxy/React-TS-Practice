import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	type UserCredential,
} from 'firebase/auth'
import { getFirebaseAuth } from './firebase'

function requireAuth() {
	const auth = getFirebaseAuth()

	if (!auth) {
		throw new Error('Firebase is not configured. Add the required values to .env.local.')
	}

	return auth
}

export async function registerWithEmail(email: string, password: string): Promise<UserCredential> {
	return createUserWithEmailAndPassword(requireAuth(), email, password)
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
	return signInWithEmailAndPassword(requireAuth(), email, password)
}

export async function sendPasswordReset(email: string) {
	return sendPasswordResetEmail(requireAuth(), email)
}

export async function signOutCurrentUser() {
	return signOut(requireAuth())
}
