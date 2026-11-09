import { FirebaseError } from 'firebase/app'
import { getFirebaseApp } from '../../features/auth/model/firebase'
import {
	productImages,
	type Product,
	type ProductImageKey,
	type ProductRecord,
} from './products'

const firestoreRequestTimeout = 15_000

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isProductImageKey(value: unknown): value is ProductImageKey {
	return typeof value === 'string' && Object.hasOwn(productImages, value)
}

function readProduct(documentId: string, value: unknown): Product {
	if (!isRecord(value)) {
		throw new Error(`Product document "${documentId}" is not a valid object.`)
	}

	const id = Number(documentId)
	const { name, price, imageKey, isNew } = value
	const isValidProduct =
		Number.isSafeInteger(id)
		&& id > 0
		&& documentId === String(id)
		&& value.id === id
		&& typeof name === 'string'
		&& name.trim().length > 0
		&& typeof price === 'number'
		&& Number.isFinite(price)
		&& price > 0
		&& isProductImageKey(imageKey)
		&& typeof isNew === 'boolean'
		&& (value.isSoldOut === undefined || typeof value.isSoldOut === 'boolean')
		&& (value.badge === undefined || typeof value.badge === 'string')
		&& (value.badgeTone === undefined || typeof value.badgeTone === 'string')

	if (!isValidProduct || !isProductImageKey(imageKey)) {
		throw new Error(`Product document "${documentId}" has invalid or missing fields.`)
	}

	const productRecord: ProductRecord = {
		id,
		name: name.trim(),
		price,
		imageKey,
		isNew,
	}

	if (typeof value.isSoldOut === 'boolean') {
		productRecord.isSoldOut = value.isSoldOut
	}

	if (typeof value.badge === 'string') {
		productRecord.badge = value.badge
	}

	if (typeof value.badgeTone === 'string') {
		productRecord.badgeTone = value.badgeTone
	}

	return {
		...productRecord,
		image: productImages[imageKey],
		rating: 0,
		ratingCount: 0,
		userRating: null,
	}
}

function readRating(value: unknown, documentId: string): number {
	if (!isRecord(value) || typeof value.value !== 'number'
		|| !Number.isInteger(value.value) || value.value < 1 || value.value > 5
	) {
		throw new Error(`Rating document "${documentId}" has an invalid value.`)
	}

	return value.value
}

export async function getProductsFromFirestore(userId?: string): Promise<Product[]> {
	const app = getFirebaseApp()

	if (!app) {
		throw new Error('Firebase is not configured.')
	}

	const firestore = await import('firebase/firestore')
	const database = firestore.getFirestore(app)
	let timeoutId: ReturnType<typeof setTimeout>
	const snapshotPromise = firestore.getDocs(
		firestore.collection(database, 'products'),
	)
	const timeoutPromise = new Promise<never>((_, reject) => {
		timeoutId = setTimeout(() => {
			reject(new Error('Timed out waiting for Firestore to respond.'))
		}, firestoreRequestTimeout)
	})
	const snapshot = await Promise.race([snapshotPromise, timeoutPromise])
		.finally(() => clearTimeout(timeoutId))

	const products = snapshot.docs.map((document) =>
		readProduct(document.id, document.data()),
	)

	const loadedProducts = await Promise.all(products.map(async (product) => {
		const ratingSnapshot = await firestore.getDocs(
			firestore.collection(database, 'products', String(product.id), 'ratings'),
		)
		const ratings = ratingSnapshot.docs.map((document) =>
			readRating(document.data(), document.id),
		)
		const currentUserRating = userId
			? ratingSnapshot.docs.find((document) => document.id === userId)
			: undefined

		return {
			...product,
			rating: ratings.length
				? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
				: 0,
			ratingCount: ratings.length,
			userRating: currentUserRating
				? readRating(currentUserRating.data(), currentUserRating.id)
				: null,
		}
	}))

	return loadedProducts.sort((first, second) => first.id - second.id)
}

export async function saveProductRating(
	productId: number,
	userId: string,
	rating: number,
): Promise<void> {
	if (!Number.isSafeInteger(productId) || productId < 1
		|| !Number.isInteger(rating) || rating < 1 || rating > 5
	) {
		throw new Error('A product rating must be a whole number from 1 to 5.')
	}

	const app = getFirebaseApp()

	if (!app) {
		throw new Error('Firebase is not configured.')
	}

	const firestore = await import('firebase/firestore')
	const database = firestore.getFirestore(app)
	const ratingReference = firestore.doc(
		database,
		'products',
		String(productId),
		'ratings',
		userId,
	)

	await firestore.setDoc(ratingReference, {
		value: rating,
		updatedAt: firestore.serverTimestamp(),
	})
}

export function getProductLoadErrorMessage(error: unknown) {
	if (error instanceof FirebaseError) {
		if (error.code === 'permission-denied') {
			if (error.message.includes('Cloud Firestore API has not been used')) {
				return 'Cloud Firestore is disabled for this Firebase project. Enable the Firestore API and create the database in the Firebase console.'
			}

			return 'Firestore denied access to the product catalog or ratings. Check the deployed Firestore rules.'
		}

		if (error.code === 'failed-precondition') {
			return 'Cloud Firestore is not ready. Create the database in the Firebase console and deploy firestore.rules.'
		}

		if (error.code === 'not-found') {
			return 'The Firestore database was not found. Create a database in the Firebase console.'
		}

		if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
			return 'Firestore is temporarily unavailable. The sample catalog is shown instead.'
		}
	}

	if (error instanceof Error) {
		if (error.message.includes('Timed out waiting for Firestore')) {
			return 'Firestore did not respond. Enable the Cloud Firestore API, create its database, and deploy rules that allow public product reads.'
		}

		return `${error.message} The sample catalog is shown instead.`
	}

	return 'Could not load products from Firestore. The sample catalog is shown instead.'
}

export function getProductRatingErrorMessage(error: unknown) {
	if (error instanceof FirebaseError && error.code === 'permission-denied') {
		return 'Firestore rejected the rating. Confirm the latest Firestore rules have been deployed.'
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Could not save your rating.'
}
