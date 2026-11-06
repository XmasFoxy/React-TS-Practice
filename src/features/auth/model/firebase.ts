import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim() ?? '',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() ?? '',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim() ?? '',
	appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim() ?? '',
}

let authInstance: Auth | null = null
let appInstance: FirebaseApp | null = null

export function isFirebaseConfigured() {
	return Object.values(firebaseConfig).every((value) => value.length > 0)
}

export function getFirebaseAuth() {
	const app = getFirebaseApp()

	if (!app) {
		return null
	}

	if (authInstance) {
		return authInstance
	}

	authInstance = getAuth(app)

	return authInstance
}

export function getFirebaseApp() {
	if (!isFirebaseConfigured()) {
		return null
	}

	if (!appInstance) {
		appInstance = getApps().find((app) => app.name === '[DEFAULT]')
			?? initializeApp(firebaseConfig)
	}

	return appInstance
}
