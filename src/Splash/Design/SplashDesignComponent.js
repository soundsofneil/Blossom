import React from 'react';
import './SplashDesignComponent.css';


export default function SplashDesignComponent() {
    return (
        <>
        <div id = 'mainInfoBox'></div>
        <div id = 'headingOval'></div>
        <div id = 'headingBox'></div>
        <img src={require('../Images/blossom_logo.png')} alt='Blossom Logo' id='logoImage'/>
        </>
    )
}
