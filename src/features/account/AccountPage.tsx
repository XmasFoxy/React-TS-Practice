import { Link } from '@tanstack/react-router'

export function AccountPage() {
	return (
		<main className="account-page content-width">
			<div className="account-card">
				<p className="eyebrow">Welcome to Cuisine Ice Cream</p>

				<h1>Your account</h1>

				<p>
					Account registration and sign-in with email and password will be
					connected to Firebase in the next project step.
				</p>

				<Link className="button button-pink" to="/catalog">
					Continue shopping
				</Link>
			</div>
		</main>
	)
}
