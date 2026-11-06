import { Link } from '@tanstack/react-router'
import { ProductCard } from '../catalog/components/ProductCard'
import { useProductCatalog } from '../catalog/model/useProductCatalog'
import { useCart } from '../cart/model/useCart'
import { flavors, products } from '../../entities/product/products'
import cafeImage from '../../assets/cafe-ice-cream.png'
import colorfulIceCreamImage from '../../assets/colorful-ice-cream.png'
import dessertsImage from '../../assets/desserts.png'
import employeeImage from '../../assets/employee.png'
import glutenFreeIcon from '../../assets/gluten-free_17087068 1.svg'
import girlWithIceCreamImage from '../../assets/girl-with-ice-cream.png'
import heroImage from '../../assets/choco-in-vafel.png'
import heroStar from '../../assets/Star 1.svg'
import heroStrawberries from '../../assets/two-strawberries.png'
import locationIcon from '../../assets/location.svg'
import mailBagImage from '../../assets/mail-bag.png'
import paleoIcon from '../../assets/avocado_7409338 1.svg'
import restaurantImage from '../../assets/restaurant-ice-cream.png'
import shopIcon from '../../assets/shop.svg'
import strawberryImage from '../../assets/strawberry-ice-cream.png'
import vehicleIcon from '../../assets/vehicle.svg'
import veganIcon from '../../assets/vegan_8814602 1.svg'
import arrowIcon from '../../assets/arrow-right.svg'
import ketoIcon from '../../assets/avocado_9952003 1.svg'
import purpleIceCreamImage from '../../assets/purple-ice-cream.png'
import vanillaNoteImage from '../../assets/raspberry-ice-cream.png'
import strawberryNoteImage from '../../assets/strawberry-ellipse.png'

export function HomePage() {
	const {
		activeFilter,
		favoriteIds,
		toggleFavorite,
		setActiveFilter,
		visibleProducts,
	} = useProductCatalog()
	const { addToCart } = useCart()

	return (
		<main className="home-page">
				<section className="hero-section" id="home">
					<div className="hero-copy">
						<p className="eyebrow">A little scoop of happiness</p>

						<h1>
							Global Cuisine
							<br />
							Meets <span>Ice Cream</span>
						</h1>

						<p className="hero-description">
							Flavours of joy, lovingly made with real ingredients.
						</p>

						<a className="button button-pink" href="#products">
							Explore our flavors <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>

					<div className="hero-image-wrap">
						<img
							className="hero-image"
							src={heroImage}
							alt="Chocolate ice cream in a waffle bowl"
							fetchPriority="high"
						/>

						<img className="hero-decoration hero-star" src={heroStar} alt="" />

						<img className="hero-decoration hero-strawberries" src={heroStrawberries} alt="" />
					</div>
				</section>

				<section className="service-strip" aria-label="Our services">
					<h2>Need Cuisine Ice Cream now?</h2>

					<a className="service-link" href="#footer">
						<span className="service-icon" aria-hidden="true">
							<img src={vehicleIcon} alt="" />
						</span>
						<span>Local delivery</span>
					</a>

					<a className="service-link" href="#footer">
						<span className="service-icon" aria-hidden="true">
							<img src={shopIcon} alt="" />
						</span>
						<span>Scoop shops</span>
					</a>

					<a className="service-link" href="#footer">
						<span className="service-icon" aria-hidden="true">
							<img src={locationIcon} alt="" />
						</span>
						<span>Grocery locator</span>
					</a>
				</section>

				<section className="story-section content-width" id="story">
					<div className="story-copy">
						<p className="eyebrow">A treat made with love</p>

						<h2>We’re Loren’s, and we love crafting unbelievably delicious tribute tubs of joy.</h2>

						<p>
							Using the finest ingredients and a little imagination, we make
							ice cream that brings people together. Every scoop is made
							slowly, thoughtfully, and with plenty of love.
						</p>

						<a className="text-link" href="#ingredients">
							Discover our story <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>

					<img
						className="story-image"
						src={colorfulIceCreamImage}
						alt="Colorful scoops of ice cream ready to share"
						loading="lazy"
					/>
				</section>

				<section className="ingredients-section content-width" id="ingredients">
					<div className="section-heading">
						<p className="eyebrow">Nothing artificial, ever</p>

						<h2>Our natural ingredients</h2>
					</div>

					<div className="flavor-list">
						{flavors.map((flavor) => (
							<a className="flavor-item" href="#products" key={flavor.name}>
								<img src={flavor.image} alt="" loading="lazy" />

								<span>{flavor.name}</span>
							</a>
						))}
					</div>
				</section>

				<section className="products-section" id="products">
					<div className="content-width">
						<div className="section-heading">
							<p className="eyebrow">Scoop into something special</p>

							<h2>Find your perfect pint!</h2>
						</div>

						<div className="product-filters" aria-label="Filter products">
							<button
								className={activeFilter === 'all' ? 'filter-button is-active' : 'filter-button'}
								type="button"
								onClick={() => setActiveFilter('all')}
							>
								Our favorites
							</button>

							<button
								className={activeFilter === 'new' ? 'filter-button is-active' : 'filter-button'}
								type="button"
								onClick={() => setActiveFilter('new')}
							>
								New arrivals
							</button>

							<button
								className={activeFilter === 'bestsellers' ? 'filter-button is-active' : 'filter-button'}
								type="button"
								onClick={() => setActiveFilter('bestsellers')}
							>
								Best sellers
							</button>
						</div>

						<div className="product-grid">
							{visibleProducts.map((product) => (
								<ProductCard
									isFavorite={favoriteIds.includes(product.id)}
									key={product.id}
									onAddToCart={() => addToCart(product.id)}
									onToggleFavorite={() => toggleFavorite(product.id)}
									product={product}
								/>
							))}
						</div>

						<Link className="button button-pink products-cta" to="/catalog">
							View all flavors <img className="arrow-icon" src={arrowIcon} alt="" />
						</Link>
					</div>
				</section>

				<section className="promotions-section content-width" aria-label="Current promotions">
					<article className="promotion-card promotion-green">
						<div className="promotion-copy">
							<p>100% natural</p>

							<h2>All you want!</h2>

							<span>Smooth & refreshing, intensely flavorful, 100% dairy free.</span>

							<a className="button button-dark" href="#products">
								Shop now <img className="arrow-icon" src={arrowIcon} alt="" />
							</a>
						</div>

						<img
							src={strawberryImage}
							alt="Strawberry ice cream with fresh berries"
							loading="lazy"
						/>
					</article>

					<article className="promotion-card promotion-orange">
						<div className="promotion-copy">
							<p>Free shipping</p>

							<h2>25% save off</h2>

							<span>Same day delivery for orders placed before 4:30 PM.</span>

							<a className="button button-orange" href="#products">
								Shop now <img className="arrow-icon" src={arrowIcon} alt="" />
							</a>
						</div>

						<img
							src={purpleIceCreamImage}
							alt="A colorful scoop of ice cream"
							loading="lazy"
						/>
					</article>
				</section>

				<section className="favorite-section content-width">
					<div className="favorite-image-wrap">
						<img
							src={dessertsImage}
							alt="A generous bowl of ice cream with sprinkles"
							loading="lazy"
						/>
					</div>

					<div className="favorite-copy">
						<p className="eyebrow">A favorite flavor</p>

						<h2>Pastries in addition to ice cream</h2>

						<p>
							Our favorite flavors are inspired by the little things that
							make every day sweeter.
						</p>

						<div className="favorite-note">
							<img className="note-image" src={vanillaNoteImage} alt="" />

							<div>
								<h3>Raspberry ripple</h3>
								<p>Sweet berries, swirled through a creamy scoop.</p>
							</div>
						</div>

						<div className="favorite-note">
							<img className="note-image" src={strawberryNoteImage} alt="" />

							<div>
								<h3>Pick your flavor</h3>
								<p>Discover a new favorite from our seasonal menu.</p>
							</div>
						</div>

						<a className="text-link" href="#products">
							Explore our menu <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>
				</section>

				<section className="occasions-section">
					<div className="content-width">
						<div className="section-heading">
							<p className="eyebrow">A little joy for every day</p>

							<h2>Ice cream for every occasion</h2>
						</div>

						<div className="occasion-grid">
							{products.slice(1, 5).map((product) => (
								<ProductCard
									isFavorite={favoriteIds.includes(product.id)}
									key={product.id}
									onAddToCart={() => addToCart(product.id)}
									onToggleFavorite={() => toggleFavorite(product.id)}
									product={product}
								/>
							))}
						</div>
					</div>
				</section>

				<section className="journal-section content-width" id="journal">
					<div className="section-heading">
						<p className="eyebrow">From our kitchen</p>

						<h2>The latest & tastiest updates</h2>
					</div>

					<div className="journal-grid">
						<article className="journal-card">
							<img
								src={cafeImage}
								alt="A table set with colorful ice cream"
								loading="lazy"
							/>

							<div className="journal-copy">
								<p className="journal-meta">Our kitchen <span>May 12, 2025</span></p>

								<h3>French vanilla ice cream for any occasion</h3>

								<p>Little moments taste better when there is a scoop to share.</p>

								<a className="text-link" href="#footer">
									Read more <img className="arrow-icon" src={arrowIcon} alt="" />
								</a>
							</div>
						</article>

						<article className="journal-card">
							<img
								src={restaurantImage}
								alt="A fresh bowl of summer ice cream"
								loading="lazy"
							/>

							<div className="journal-copy">
								<p className="journal-meta">Sweet stories <span>May 03, 2025</span></p>

								<h3>5 reasons to make this a summer to remember</h3>

								<p>Meet your new favorite summer ritual, one scoop at a time.</p>

								<a className="text-link" href="#footer">
									Read more <img className="arrow-icon" src={arrowIcon} alt="" />
								</a>
							</div>
						</article>
					</div>
				</section>

				<section className="diet-section content-width" aria-label="Dietary options">
					{[
						{ name: 'Vegan', icon: veganIcon },
						{ name: 'Gluten-free', icon: glutenFreeIcon },
						{ name: 'Paleo', icon: paleoIcon },
						{ name: 'Keto', icon: ketoIcon },
					].map((diet) => (
						<a className="diet-item" href="#products" key={diet.name}>
							<span className="diet-icon" aria-hidden="true">
								<img src={diet.icon} alt="" />
							</span>
							<span>{diet.name}</span>
						</a>
					))}
				</section>

				<section className="testimonial-section">
					<div className="testimonial-copy">
						<div className="section-heading">
							<p className="eyebrow">A few words from our customers</p>

							<h2>Savouring your taste buds</h2>
						</div>

						<blockquote>
							<p>
								“Every flavor tastes like it was made with care. Our
								family has a new favorite for every season.”
							</p>

							<cite>Emily R. <span>— a happy customer</span></cite>
						</blockquote>

						<blockquote>
							<p>
								“Such a lovely little shop. The ingredients are fresh and
								the scoops are always generous.”
							</p>

							<cite>Olivia M. <span>— a happy customer</span></cite>
						</blockquote>

						<a className="button button-pink" href="#products">Find your flavor</a>
					</div>

					<img
						className="testimonial-image"
						src={girlWithIceCreamImage}
						alt="Enjoying an ice cream on a sunny day"
						loading="lazy"
					/>
				</section>

				<section className="newsletter-section">
					<div className="newsletter-decoration" aria-hidden="true">
						<img src={mailBagImage} alt="" />
					</div>

					<div className="newsletter-copy">
						<p className="eyebrow">A little sweetness in your inbox</p>

						<h2>Join our mailing list</h2>

						<p>Get the latest flavors, news, and a little treat from us.</p>

						<form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
							<label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>

							<input
								autoComplete="email"
								id="newsletter-email"
								name="email"
								placeholder="Enter your email"
								required
								type="email"
							/>

							<button className="button button-pink" type="submit">Subscribe</button>
						</form>
					</div>

					<div className="newsletter-decoration newsletter-decoration-right" aria-hidden="true">
						<img src={employeeImage} alt="" />
					</div>
				</section>
		</main>
	)
}
