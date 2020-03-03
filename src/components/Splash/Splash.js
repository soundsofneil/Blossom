import React from 'react'
import './Splash.css';
import SplashHeaderComponent from './Header/SplashHeaderComponent'
import SplashBodyComponent from './Body/SplashBodyComponent';

export default function Splash() {
    return (
        <div id="splash">
            <SplashHeaderComponent />
            <SplashBodyComponent />
        </div>
    )
}