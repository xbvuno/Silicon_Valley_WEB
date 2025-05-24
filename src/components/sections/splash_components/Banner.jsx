import { forwardRef } from "react";
import './.styles/Banner.css'

const Banner = forwardRef(function(props, ref) {
    return (
        <section className='sv-banner' ref={ref}>
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
});

export default Banner;
