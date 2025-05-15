import { useEffect, useRef } from "react";
import "./Header.css";

function Header() {
	const headerRef = useRef(null);
	useEffect(() => {
		function onScroll() {
			if (header.getBoundingClientRect().top == 0) {
				if (header.classList.contains("hidden")) {
					header.classList.remove("hidden");
				}
			} else {
				if (!header.classList.contains("hidden")) {
					header.classList.add("hidden");
				}
			}
		}

		if (!headerRef.current) return;
		const header = headerRef.current;

		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);
	return (
		<header className='hidden' ref={headerRef}>
			<div className='ff'>
				<img src='media/svg/fried_fish.svg' alt='Fried Fish logo' />
				<h2 className='ff-title'>Fried Fish</h2>
			</div>
			<div>
				<h1 className='sv-title'>SILICON VALLEY</h1>
			</div>
		</header>
	);
}

export default Header;
