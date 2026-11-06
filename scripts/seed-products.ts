import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import {
	productRecords,
	removedProductIds,
} from '../src/entities/product/productRecords.ts'

const projectId = process.env.GCLOUD_PROJECT

if (!projectId) {
	throw new Error('Set GCLOUD_PROJECT to the Firebase project ID before seeding products.')
}

const app = initializeApp({
	credential: applicationDefault(),
	projectId,
})

const database = getFirestore(app)
const batch = database.batch()

for (const product of productRecords) {
	const productReference = database.collection('products').doc(String(product.id))
	batch.set(productReference, product)
}

for (const productId of removedProductIds) {
	const productReference = database.collection('products').doc(String(productId))
	batch.delete(productReference)
}

await batch.commit()

console.log(
	`Added or updated ${productRecords.length} products and removed ${removedProductIds.length} duplicate products in Firestore.`,
)
