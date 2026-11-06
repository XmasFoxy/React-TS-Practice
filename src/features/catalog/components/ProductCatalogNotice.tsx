type ProductCatalogNoticeProps = {
	error: string | null
	isLoading: boolean
	isUsingSampleProducts: boolean
	onRetry: () => void
}

export function ProductCatalogNotice({
	error,
	isLoading,
	isUsingSampleProducts,
	onRetry,
}: ProductCatalogNoticeProps) {
	if (error) {
		return (
			<div className="catalog-notice catalog-notice-error" role="alert">
				<p>{error}</p>

				<button
					className="catalog-retry-button"
					onClick={() => onRetry()}
					type="button"
				>
					Try again
				</button>
			</div>
		)
	}

	if (isLoading) {
		return (
			<p className="catalog-notice" role="status">
				Loading ice cream from Firebase...
			</p>
		)
	}

	if (isUsingSampleProducts) {
		return (
			<p className="catalog-notice" role="status">
				The sample catalog is shown. Add documents to the Firestore products collection to load
				the live shop catalog.
			</p>
		)
	}

	return null
}
