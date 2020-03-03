import React from 'react'
import './Splash.css';
import SplashHeaderComponent from './Header/SplashHeaderComponent'
import SplashBodyComponent from './Body/SplashBodyComponent';

export default function Splash(props) {
    return (
        <div id="splash">
            <SplashHeaderComponent signUp={props.signUp} signIn={props.signIn}/>
            <SplashBodyComponent />
        </div>
    )
}
