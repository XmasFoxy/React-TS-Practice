import { useRouter } from '@tanstack/react-router'
import type { User } from 'firebase/auth'
import { useState } from 'react'
import { getAuthErrorMessage } from '../auth/model/authErrors'
import { signOutCurrentUser } from '../auth/model/authService'

type AccountPageProps = {
	user: User
}

export function AccountPage({ user }: AccountPageProps) {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const [isSigningOut, setIsSigningOut] = useState(false)

	async function handleSignOut() {
		setError(null)
		setIsSigningOut(true)

		try {
			await signOutCurrentUser()
			router.history.push('/')
		} catch (signOutError) {
			setError(getAuthErrorMessage(signOutError))
		} finally {
			setIsSigningOut(false)
		}
	}

	return (
		<main className="account-page content-width">
			<div className="account-card">
				<p className="eyebrow">Welcome to Cuisine Ice Cream</p>

				<h1>Your account</h1>

				<p>You are signed in as {user.email ?? 'a Firebase user'}.</p>

				{error ? (
					<p className="auth-message auth-message-error" role="alert">
						{error}
					</p>
				) : null}

				<button
					className="button button-pink"
					disabled={isSigningOut}
					onClick={handleSignOut}
					type="button"
				>
					{isSigningOut ? 'Signing out...' : 'Sign out'}
				</button>
			</div>
		</main>
	)
}
