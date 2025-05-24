import { forwardRef } from "react";
import "./.styles/Header.css";

const Header = forwardRef(function(props, ref) {
    return (
        <header ref={ref} className="hidden">
            <div className='ff'>
                <img src='media/svg/fried_fish.svg' alt='Fried Fish logo' />
                <h2 className='ff-title'>Fried Fish</h2>
            </div>
            <div>
                <h1 className='sv-title'>SILICON VALLEY</h1>
            </div>
        </header>
    );
});

export default Header;
