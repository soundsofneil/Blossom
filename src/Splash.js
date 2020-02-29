import React from 'react'
import './Splash.css';
import SplashHeaderComponent from './SplashHeaderComponent'
import SplashBodyComponent from './SplashBodyComponent';
import SplashDesignComponent from './SplashDesignComponent.js';

export default function Splash() {
    return (
        <>
        <SplashHeaderComponent />
        <SplashDesignComponent />
        {/*<SplashBodyComponent />*/}
        </>
    )
}
