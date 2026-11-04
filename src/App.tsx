function App() {
	return (
		<div className="min-h-screen bg-rose-50 px-5 py-8 text-stone-900 sm:px-10 sm:py-12">
			<header className="mx-auto flex max-w-6xl items-center justify-between">
				<a
					className="text-2xl font-bold tracking-tight text-rose-800"
					href="/"
				>
					Gelato
				</a>

				<p className="text-sm font-medium text-stone-600 sm:text-base">
					Магазин мороженого
				</p>
			</header>

			<main className="mx-auto mt-12 max-w-6xl sm:mt-20">
				<section className="rounded-3xl bg-white px-6 py-12 shadow-sm sm:px-12 sm:py-16">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
						Свежие вкусы каждый день
					</p>

					<h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
						Маленькая радость в каждой ложке
					</h1>

					<p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
						Здесь появится каталог нашего мороженого. Мы начнём с простых вкусов и
						постепенно добавим корзину и оформление заказа.
					</p>
				</section>
			</main>
		</div>
	)
}

export default App
