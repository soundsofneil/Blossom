import React from 'react'
import './Splash.css';
import SplashHeaderComponent from './Header/SplashHeaderComponent'
import SplashBodyComponent from './Body/SplashBodyComponent';
import SplashDesignComponent from './Design/SplashDesignComponent';

export default function Splash() {
    return (
        <>
        <SplashDesignComponent />
        <SplashHeaderComponent />
        <SplashBodyComponent />
        </>
    )
}
