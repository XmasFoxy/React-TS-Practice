import { FirebaseError } from 'firebase/app'

const firebaseErrorMessages: Record<string, string> = {
	'auth/email-already-in-use': 'An account with this email already exists.',
	'auth/invalid-credential': 'The email or password is incorrect.',
	'auth/invalid-email': 'Enter a valid email address.',
	'auth/network-request-failed': 'Network error. Check your connection and try again.',
	'auth/operation-not-allowed': 'Email and password sign-in is not enabled for this Firebase project.',
	'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
	'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
	'auth/user-disabled': 'This account has been disabled.',
	'auth/user-not-found': 'No account was found with this email.',
	'auth/wrong-password': 'The email or password is incorrect.',
}

export function getAuthErrorMessage(error: unknown) {
	if (error instanceof FirebaseError) {
		return firebaseErrorMessages[error.code] ?? 'Authentication failed. Please try again.'
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Authentication failed. Please try again.'
}
