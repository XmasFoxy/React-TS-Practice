import heroImage from '../../../assets/choco-in-vafel.png'
import heroStrawberries from '../../../assets/two-strawberries.png'
import mapIcon from '../../../assets/map.svg'
import shopIcon from '../../../assets/shop.svg'
import vehicleIcon from '../../../assets/vehicle.svg'
import storyImage from '../../../assets/desserts.png'
import arrowIcon from '../../../assets/arrow-right.svg'

export function HomeIntro() {
	return (
		<>
			<section className="hero-section" id="home">
				<div className="hero-copy">
					<h1>
						Global Cuisine
						<br />
						Meets <span>Ice Cream</span>
					</h1>

					<p className="hero-description">Flavours of joyfulness</p>
				</div>

				<div className="hero-image-wrap">
					<img
						className="hero-image"
						src={heroImage}
						alt="Chocolate ice cream in a waffle bowl"
						fetchPriority="high"
					/>

					<img className="hero-decoration hero-strawberries hero-strawberries-top" src={heroStrawberries} alt="" />

					<img className="hero-decoration hero-strawberries hero-strawberries-bottom" src={heroStrawberries} alt="" />
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
						<img src={mapIcon} alt="" />
					</span>
					<span>Grocery Locator</span>
				</a>
			</section>

			<section className="story-section content-width" id="story">
				<div className="story-copy">
					<p className="eyebrow">A treat made with love</p>

					<h2>We’re Loren’s, and we love crafting unbelievably delicious stripey tubs of joy.</h2>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
						do eiusmod tempor incididunt. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt.
					</p>

					<div className="story-link-list">
						<a href="#products">
							<img src={arrowIcon} alt="" />
							Scoop Shop Flavors
						</a>

						<a href="#products">
							<img src={arrowIcon} alt="" />
							Ice Cream Pints
						</a>

						<a href="#products">
							<img src={arrowIcon} alt="" />
							Frozen Yogurt Pints
						</a>

						<a href="#products">
							<img src={arrowIcon} alt="" />
							Chocolatey Love
						</a>
					</div>

					<a className="button button-pink story-button" href="#products">
						Join the cuisine <img className="arrow-icon" src={arrowIcon} alt="" />
					</a>
				</div>

				<img
					className="story-image"
					src={storyImage}
					alt="A selection of colorful ice cream cones"
					loading="lazy"
				/>
			</section>
		</>
	)
}
