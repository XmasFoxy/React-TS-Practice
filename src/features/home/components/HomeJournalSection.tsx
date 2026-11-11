import { useState, type FormEvent } from 'react'
import cafeImage from '../../../assets/cafe-ice-cream.png'
import calendarIcon from '../../../assets/calendar.svg'
import employeeImage from '../../../assets/employee.png'
import glutenFreeIcon from '../../../assets/gluten-free_17087068 1.svg'
import girlWithIceCreamImage from '../../../assets/girl-with-ice-cream.png'
import ketoIcon from '../../../assets/avocado_9952003 1.svg'
import mailBagImage from '../../../assets/mail-bag.png'
import paleoIcon from '../../../assets/avocado_7409338 1.svg'
import restaurantImage from '../../../assets/restaurant-ice-cream.png'
import smsIcon from '../../../assets/sms.svg'
import veganIcon from '../../../assets/vegan_8814602 1.svg'
import arrowIcon from '../../../assets/arrow-right.svg'

const dietaryOptions = [
	{ name: 'Vegan', icon: veganIcon },
	{ name: 'Gluten-Free', icon: glutenFreeIcon },
	{ name: 'Paleo', icon: paleoIcon },
	{ name: 'Keto', icon: ketoIcon },
]

const journalPosts = [
	{
		image: restaurantImage,
		imageDescription: 'A plate with several scoops of ice cream',
		date: '24 Feb 2024',
		dateTime: '2024-02-24',
		title: 'French Vanilla Ice Cream For Any Occasion',
	},
	{
		image: cafeImage,
		imageDescription: 'Scoops of ice cream with colorful sprinkles beside flowers',
		date: '23 Apr 2024',
		dateTime: '2024-04-23',
		title: '5 Dreamy Ice Cream Hacks For Summer',
	},
]

const reviews = [
	{
		name: 'Eshan B',
		text: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		name: 'KPlndia',
		text: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		name: 'KPlndia',
		text: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
]

export function HomeJournalSection() {
	const [newsletterEmail, setNewsletterEmail] = useState('')
	const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)

	function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setNewsletterEmail('')
		setNewsletterMessage('Thank you! You are successfully subscribed.')
	}

	return (
		<>
			<section className="journal-section content-width" id="journal">
				<div className="section-heading">
					<p className="eyebrow">Our Journal</p>

					<h2>Latest News &amp; Updates</h2>
				</div>

				<div className="journal-grid">
					{journalPosts.map((post) => (
						<article className="journal-card" key={post.title}>
							<img
								className="journal-image"
								src={post.image}
								alt={post.imageDescription}
								loading="lazy"
							/>

							<div className="journal-date">
								<span className="journal-date-icon" aria-hidden="true">
									<img src={calendarIcon} alt="" />
								</span>

								<time dateTime={post.dateTime}>{post.date}</time>
							</div>

							<div className="journal-copy">
								<div className="journal-meta">
									<span className="journal-category">By Cuisine Theme</span>

									<span className="journal-comments">
										<img src={smsIcon} alt="" />
										6 Comments
									</span>
								</div>

								<h3>{post.title}</h3>

								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit,
									sed do eiusmod tempor incididunt.
								</p>

								<a className="button button-pink journal-button" href="#footer">
									Read More <img className="arrow-icon" src={arrowIcon} alt="" />
								</a>
							</div>
						</article>
					))}
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

			<section className="testimonials">
				<div className="section-heading testimonial-heading">
					<p className="testimonial-rating">
						<span className="testimonial-stars" aria-label="Rated 4.8 out of 5">
							{Array.from({ length: 5 }, (_, index) => {
								const fill = Math.max(0, Math.min(1, 4.8 - index)) * 100

								return (
									<span className="testimonial-star" aria-hidden="true" key={index}>
										★
										<span
											className="testimonial-star-fill"
											style={{ width: `${fill}%` }}
										>
											★
										</span>
									</span>
								)
							})}
						</span>
						4.8/5 TRUSTED BY 199,087 CLIENTS
					</p>

					<h2>Savouring Your Taste Buds</h2>
				</div>

				<div className="testimonial-section">
					<div className="testimonial-copy">
						{reviews.map((review, index) => (
							<blockquote key={`${review.name}-${index}`}>
								<p>{review.text}</p>

								<cite>{review.name}</cite>
							</blockquote>
						))}

						<a className="button button-pink" href="#journal">
							Customer Reviews <img className="arrow-icon" src={arrowIcon} alt="" />
						</a>
					</div>

					<img
						className="testimonial-image"
						src={girlWithIceCreamImage}
						alt="Enjoying an ice cream on a sunny day"
						loading="lazy"
					/>
				</div>
			</section>

			<section className="newsletter-section">
				<div className="newsletter-decoration newsletter-decoration-left" aria-hidden="true">
					<img src={mailBagImage} alt="" />
				</div>

				<div className="newsletter-copy">
					<div className="section-heading">
						<p className="eyebrow">Our Newsletter</p>

						<h2>Join Our Mailing List</h2>
					</div>

					<p>
						Sign up to our newsletter today and get 10% off your very first
						online order with Cuisine.
					</p>

					<form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
						<label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>

						<input
							autoComplete="email"
							id="newsletter-email"
							name="email"
							onChange={(event) => {
								setNewsletterEmail(event.currentTarget.value)
								setNewsletterMessage(null)
							}}
							placeholder="Enter Your Email"
							required
							type="email"
							value={newsletterEmail}
						/>

						<button className="button button-pink" type="submit">Subscribe</button>
					</form>

					{newsletterMessage ? (
						<p className="newsletter-success" role="status">
							{newsletterMessage}
						</p>
					) : null}
				</div>

				<div className="newsletter-decoration newsletter-decoration-right" aria-hidden="true">
					<img src={employeeImage} alt="" />
				</div>
			</section>
		</>
	)
}
