import { FirebaseError } from 'firebase/app'
import { getFirebaseApp } from '../../features/auth/model/firebase'

export type CartRecord = {
	productId: number
	quantity: number
}

function getFirestoreModule() {
	const app = getFirebaseApp()

	if (!app) {
		throw new Error('Firebase is not configured.')
	}

	return import('firebase/firestore').then((firestore) => ({
		database: firestore.getFirestore(app),
		firestore,
	}))
}

export async function getCartFromFirestore(userId: string): Promise<CartRecord[]> {
	const { database, firestore } = await getFirestoreModule()
	const cartSnapshot = await firestore.getDocs(
		firestore.collection(database, 'users', userId, 'cart'),
	)

	return cartSnapshot.docs.map((document) => {
		const productId = Number(document.id)
		const { quantity } = document.data()

		if (!Number.isSafeInteger(productId) || productId < 1
			|| typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 1
		) {
			throw new Error(`Cart document "${document.id}" contains invalid data.`)
		}

		return { productId, quantity }
	})
}

export async function addCartProduct(userId: string, productId: number): Promise<void> {
	if (!Number.isSafeInteger(productId) || productId < 1) {
		throw new Error('Cart product ID must be a positive whole number.')
	}

	const { database, firestore } = await getFirestoreModule()
	const cartReference = firestore.doc(database, 'users', userId, 'cart', String(productId))

	await firestore.runTransaction(database, async (transaction) => {
		const cartDocument = await transaction.get(cartReference)
		const currentQuantity = cartDocument.exists()
			? cartDocument.data().quantity
			: 0

		if (typeof currentQuantity !== 'number'
			|| !Number.isSafeInteger(currentQuantity) || currentQuantity < 0
		) {
			throw new Error(`Cart document "${productId}" contains an invalid quantity.`)
		}

		if (currentQuantity === Number.MAX_SAFE_INTEGER) {
			throw new Error(`Cart document "${productId}" has reached the maximum quantity.`)
		}

		transaction.set(cartReference, { quantity: currentQuantity + 1 })
	})
}

export async function updateCartProduct(
	userId: string,
	productId: number,
	quantity: number,
): Promise<void> {
	if (!Number.isSafeInteger(productId) || productId < 1) {
		throw new Error('Cart product ID must be a positive whole number.')
	}

	const { database, firestore } = await getFirestoreModule()
	const cartReference = firestore.doc(database, 'users', userId, 'cart', String(productId))

	if (quantity < 1) {
		await firestore.deleteDoc(cartReference)
		return
	}

	if (!Number.isSafeInteger(quantity)) {
		throw new Error('Cart quantity must be a whole number.')
	}

	await firestore.setDoc(cartReference, { quantity })
}

export async function removeCartProduct(userId: string, productId: number): Promise<void> {
	if (!Number.isSafeInteger(productId) || productId < 1) {
		throw new Error('Cart product ID must be a positive whole number.')
	}

	const { database, firestore } = await getFirestoreModule()
	const cartReference = firestore.doc(database, 'users', userId, 'cart', String(productId))

	await firestore.deleteDoc(cartReference)
}

export async function getFavoritesFromFirestore(userId: string): Promise<number[]> {
	const { database, firestore } = await getFirestoreModule()
	const favoritesSnapshot = await firestore.getDocs(
		firestore.collection(database, 'users', userId, 'favorites'),
	)

	return favoritesSnapshot.docs.map((document) => {
		const productId = Number(document.id)
		const favoriteData = document.data()

		if (!Number.isSafeInteger(productId) || productId < 1
			|| favoriteData.productId !== productId
		) {
			throw new Error(`Favorite document "${document.id}" contains invalid data.`)
		}

		return productId
	})
}

export async function setFavoriteInFirestore(
	userId: string,
	productId: number,
	isFavorite: boolean,
): Promise<void> {
	if (!Number.isSafeInteger(productId) || productId < 1) {
		throw new Error('Favorite product ID must be a positive whole number.')
	}

	const { database, firestore } = await getFirestoreModule()
	const favoriteReference = firestore.doc(
		database,
		'users',
		userId,
		'favorites',
		String(productId),
	)

	if (isFavorite) {
		await firestore.setDoc(favoriteReference, { productId })
		return
	}

	await firestore.deleteDoc(favoriteReference)
}

export function getUserDataErrorMessage(error: unknown): string {
	if (error instanceof FirebaseError && error.code === 'permission-denied') {
		return 'Firestore denied access. Deploy the updated Firestore security rules and sign in again.'
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Could not save your account data.'
}
