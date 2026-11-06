import { createFileRoute } from '@tanstack/react-router'
import { CatalogPage } from '../features/catalog/CatalogPage'

export const Route = createFileRoute('/catalog')({
	component: CatalogPage,
})
