import { useEffect, useRef } from "react";
import Banner from "./splash_components/Banner";
import Header from "./splash_components/Header";

Math.clamp = (min, value, max) => {
    return Math.max(min, Math.min(value, max));
}

function SplashSection() {
    const bannerRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!headerRef.current || !bannerRef.current) return;

        const header = headerRef.current;
        const banner = bannerRef.current;

        function onScroll() {
            const banner_rect = banner.getBoundingClientRect();

            if (banner_rect.bottom <= 0) {                
                header.classList.remove("hidden");
            } else {
                header.classList.add("hidden");
            }
            
            banner.style.opacity = Math.clamp(0, 1 - window.scrollY / banner_rect.height, 1);
        }

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <>
            <Banner ref={bannerRef} />
            <Header ref={headerRef} />
        </>
    );
}

export default SplashSection;
