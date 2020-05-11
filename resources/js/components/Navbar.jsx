import React from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory()

    return (
        <div className="Navbar">
            <i className="Navbar__back fas fa-arrow-left" onClick={redirectToPreviousPage}/>
            <div className="Navbar__links">
                <Link to='/' className="Navbar__link">Tickets</Link>
                <Link to='/products' className="Navbar__link">Ingredients</Link>
                <Link to='/profile/default_profile' className="Navbar__link">Profil</Link>
            </div>
        </div>
    );

    /**
     * Redirects the user to the previous url based on history
     */
    function redirectToPreviousPage() {
        history.goBack();
    }
}
