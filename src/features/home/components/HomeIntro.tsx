import arrowIcon from '../../../assets/arrow-right.svg'
import colorfulIceCreamImage from '../../../assets/colorful-ice-cream.png'
import heroImage from '../../../assets/choco-in-vafel.png'
import heroStar from '../../../assets/Star 1.svg'
import heroStrawberries from '../../../assets/two-strawberries.png'
import locationIcon from '../../../assets/location.svg'
import shopIcon from '../../../assets/shop.svg'
import vehicleIcon from '../../../assets/vehicle.svg'

export function HomeIntro() {
	return (
		<>
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
		</>
	)
}
