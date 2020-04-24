import React from 'react';
import loading from "../../../public/images/loading.gif"

export default function Loading(props) {
    return !props.isHidden && <img className="Loading" src={loading} alt="Gif de chargement"/>;
}
