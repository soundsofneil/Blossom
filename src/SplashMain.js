import React from 'react'
import './SplashMain.css';
import SplashHeaderComponent from './SplashHeaderComponent'
import SplashBodyComponent from './SplashBodyComponent';

export default function SplashMain() {
    return (
        <div class = 'SplashMain-header'>
            <SplashHeaderComponent />
            <SplashBodyComponent />
        </div>
    )
}
