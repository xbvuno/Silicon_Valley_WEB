import { useEffect, useRef } from "react";
import './Banner.css'
function Banner() {
	const bannerRef = useRef(null);
	useEffect(() => {
		if (!bannerRef.current) return;
		const banner = bannerRef.current;
		document.addEventListener("scroll", function () {
			banner.style.opacity = 1 - window.scrollY / 200;
		});
	}, []);
	return (
		<section className='sv-banner' ref={bannerRef}>
			<div className='ff'>
				<img src='media/svg/fried_fish.svg' alt='Fried Fish logo' />
				<h2 className='ff-title'>Fried Fish</h2>
			</div>
			<h1 className='sv-title'>SILICON VALLEY</h1>
			<p className='sv-chap-sub'>
				IF YOU WANT YOUR CAR... YOU HAVE TO SEARCH IT
			</p>
		</section>
	);
}

export default Banner;
