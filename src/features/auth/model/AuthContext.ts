import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthStatus = 'loading' | 'signed-in' | 'signed-out' | 'unconfigured' | 'error'

export type AuthContextValue = {
	user: User | null
	status: AuthStatus
	error: string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)
