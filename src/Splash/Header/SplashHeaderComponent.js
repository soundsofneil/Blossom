import React from 'react'
import './SplashHeaderComponent.css';


export default function SplashHeaderComponent() {
    return (
        <>
        <div id='headerSection'>
        <span class='sloganText'>
            Can't find the right University?
        </span>
        <span class='sloganText'>
            We can help.
        </span>
        <span id='titleText'>
            blossom
        </span>

        <button id='signInButton'><span id='signInButtonText'>Sign In or Sign Up</span></button>
    
        </div>
        </>
    )
}
