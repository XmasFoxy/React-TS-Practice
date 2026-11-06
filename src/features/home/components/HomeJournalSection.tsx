import cafeImage from '../../../assets/cafe-ice-cream.png'
import employeeImage from '../../../assets/employee.png'
import glutenFreeIcon from '../../../assets/gluten-free_17087068 1.svg'
import girlWithIceCreamImage from '../../../assets/girl-with-ice-cream.png'
import ketoIcon from '../../../assets/avocado_9952003 1.svg'
import mailBagImage from '../../../assets/mail-bag.png'
import paleoIcon from '../../../assets/avocado_7409338 1.svg'
import restaurantImage from '../../../assets/restaurant-ice-cream.png'
import veganIcon from '../../../assets/vegan_8814602 1.svg'
import arrowIcon from '../../../assets/arrow-right.svg'

const dietaryOptions = [
	{ name: 'Vegan', icon: veganIcon },
	{ name: 'Gluten-free', icon: glutenFreeIcon },
	{ name: 'Paleo', icon: paleoIcon },
	{ name: 'Keto', icon: ketoIcon },
]

export function HomeJournalSection() {
	return (
		<>
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
				{dietaryOptions.map((diet) => (
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
		</>
	)
}
