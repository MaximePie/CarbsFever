import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="Navbar">
            <Link to='/' className="Navbar__link">Tickets</Link>
            <Link to='/products' className="Navbar__link">Ingredients</Link>
            <Link to='/profile/default_profile' className="Navbar__link">Profil</Link>
        </div>
    );
}
