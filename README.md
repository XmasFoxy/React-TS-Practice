# Cuisine Ice Cream

Responsive ice cream shop built with React, TypeScript, Vite, Tailwind CSS, TanStack Router, TanStack Query, and Firebase.

## Features

- Browse and filter the ice cream catalog.
- Sign up, sign in, and manage a personal cart and favorites.
- Rate products and view average ratings.
- Load catalog and user data from Firebase Firestore.

## Dependencies

- Application: `react`, `react-dom`, `firebase`, `@tanstack/react-router`, `@tanstack/react-query`, `tailwindcss`, `@tailwindcss/vite`.
- Development and tooling: `vite`, `typescript`, `@tanstack/router-plugin`, `oxlint`, `firebase-admin`, `@types/node`, `@types/react`, `@types/react-dom`.

## Run locally

1. Install Node.js and npm.
2. Install dependencies: `npm install`.
3. Create `.env.local` with `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`.
4. Start the development server: `npm run dev`.
5. Create a production build with `npm run build`; run lint with `npm run lint`.

To seed the product catalog, configure Firebase Admin credentials and run `npm run seed:products`.

## Deployment

- Firebase Hosting: https://react-ts-practice-87181.web.app
- Deploy with `npx firebase-tools deploy --only hosting --project react-ts-practice-87181`.
