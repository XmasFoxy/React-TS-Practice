import { Link, useRouter } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { getAuthErrorMessage } from '../model/authErrors'
import { isFirebaseConfigured } from '../model/firebase'
import {
	registerWithEmail,
	sendPasswordReset,
	signInWithEmail,
} from '../model/authService'
import { useAuth } from '../model/useAuth'

type AuthPageProps = {
	mode: 'login' | 'register'
	redirect: string
}

export function AuthPage({ mode, redirect }: AuthPageProps) {
	const router = useRouter()
	const { status, error: authStateError } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isResetMode, setIsResetMode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	const isRegistration = mode === 'register'
	const isConfigured = isFirebaseConfigured()

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError(null)
		setMessage(null)
		setIsSubmitting(true)

		try {
			if (isResetMode) {
				await sendPasswordReset(email.trim())
				setMessage('If an account with this email exists, a reset link has been sent.')
				return
			}

			if (isRegistration) {
				await registerWithEmail(email.trim(), password)
			} else {
				await signInWithEmail(email.trim(), password)
			}

			router.history.push(redirect)
		} catch (submitError) {
			setError(getAuthErrorMessage(submitError))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<main className="account-page content-width">
			<section className="account-card auth-card" aria-labelledby="auth-heading">
				<p className="eyebrow">Welcome to Cuisine Ice Cream</p>

				<h1 id="auth-heading">
					{isResetMode ? 'Reset your password' : isRegistration ? 'Create your account' : 'Welcome back'}
				</h1>

				<p className="auth-intro">
					{isResetMode
						? 'Enter your email and we will send a link to reset your password.'
						: isRegistration
							? 'Create an account to enjoy your next scoop.'
							: 'Sign in to visit your account.'}
				</p>

				{!isConfigured ? (
					<p className="auth-message auth-message-error" role="alert">
						Firebase is not configured. Add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN,
						VITE_FIREBASE_PROJECT_ID, and VITE_FIREBASE_APP_ID to your local .env.local file.
					</p>
				) : null}

				{authStateError ? (
					<p className="auth-message auth-message-error" role="alert">
						{authStateError}
					</p>
				) : null}

				{error ? (
					<p className="auth-message auth-message-error" role="alert">
						{error}
					</p>
				) : null}

				{message ? (
					<p className="auth-message auth-message-success" role="status">
						{message}
					</p>
				) : null}

				<form className="auth-form" onSubmit={handleSubmit}>
					<label htmlFor="auth-email">Email address</label>

					<input
						autoComplete="email"
						autoFocus
						id="auth-email"
						name="email"
						onChange={(event) => setEmail(event.currentTarget.value)}
						required
						type="email"
						value={email}
					/>

					{!isResetMode ? (
						<>
							<label htmlFor="auth-password">Password</label>

							<input
								autoComplete={isRegistration ? 'new-password' : 'current-password'}
								id="auth-password"
								minLength={6}
								name="password"
								onChange={(event) => setPassword(event.currentTarget.value)}
								required
								type="password"
								value={password}
							/>
						</>
					) : null}

					<button
						className="button button-pink auth-submit"
						disabled={!isConfigured || isSubmitting || status === 'loading'}
						type="submit"
					>
						{isSubmitting
							? 'Please wait...'
							: isResetMode
								? 'Send reset link'
								: isRegistration
									? 'Create account'
									: 'Sign in'}
					</button>
				</form>

				{!isRegistration ? (
					<button
						className="auth-text-button"
						disabled={!isConfigured || isSubmitting}
						onClick={() => {
							setIsResetMode((currentMode) => !currentMode)
							setError(null)
							setMessage(null)
						}}
						type="button"
					>
						{isResetMode ? 'Back to sign in' : 'Forgot your password?'}
					</button>
				) : null}

				<p className="auth-switch">
					{isRegistration ? 'Already have an account?' : 'New to Cuisine Ice Cream?'}
					{' '}
					<Link
						search={{ redirect }}
						to={isRegistration ? '/login' : '/register'}
					>
						{isRegistration ? 'Sign in' : 'Create an account'}
					</Link>
				</p>
			</section>
		</main>
	)
}
