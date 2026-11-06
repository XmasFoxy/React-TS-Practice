import { useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type Auth, type User } from 'firebase/auth'
import { getAuthErrorMessage } from './authErrors'
import { AuthContext, type AuthStatus } from './AuthContext'
import { getFirebaseAuth } from './firebase'

type AuthProviderProps = {
	children: ReactNode
}

type InitialAuthState = {
	auth: Auth | null
	error: string | null
}

function getInitialAuthState(): InitialAuthState {
	try {
		return {
			auth: getFirebaseAuth(),
			error: null,
		}
	} catch (authError) {
		return {
			auth: null,
			error: getAuthErrorMessage(authError),
		}
	}
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [initialAuthState] = useState(getInitialAuthState)
	const [user, setUser] = useState<User | null>(null)
	const [status, setStatus] = useState<AuthStatus>(
		initialAuthState.error
			? 'error'
			: initialAuthState.auth
				? 'loading'
				: 'unconfigured',
	)
	const [error, setError] = useState<string | null>(initialAuthState.error)

	useEffect(() => {
		if (!initialAuthState.auth) {
			return
		}

		return onAuthStateChanged(
			initialAuthState.auth,
			(currentUser) => {
				setUser(currentUser)
				setStatus(currentUser ? 'signed-in' : 'signed-out')
				setError(null)
			},
			(authError) => {
				setStatus('error')
				setError(getAuthErrorMessage(authError))
			},
		)
	}, [initialAuthState])

	return (
		<AuthContext.Provider value={{ user, status, error }}>
			{children}
		</AuthContext.Provider>
	)
}
