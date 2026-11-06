export function validateAuthSearch(search: Record<string, unknown>) {
	const redirect = search.redirect

	if (
		typeof redirect === 'string'
		&& redirect.startsWith('/')
		&& !redirect.startsWith('//')
	) {
		return { redirect }
	}

	return { redirect: '/account' }
}
