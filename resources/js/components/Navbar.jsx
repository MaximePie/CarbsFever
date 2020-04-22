import React from 'react';
import {Link} from "react-router-dom";

export default function Component(props) {
    return (
        <div className="Navbar">
            <Link to='/' className="Navbar__link">Tous les tickets</Link>
        </div>
    );
}
