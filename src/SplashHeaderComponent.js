import React from 'react'
import './SplashHeaderComponent.css';


export default function SplashHeaderComponent() {
    return (
        <>
        <img src={require('./blossom_logo.png')} alt='Blossom Logo' id='logoImage'/>

        <div id='sloganTextSection'>

        <span class='sloganText'>
            Can't find the right University?
        </span>
        <span class='sloganText'>
            We can help.
        </span>
        <span id='titleText'>
            Blossom
        </span>

        <button id='signInButton'>Sign In or Sign Up</button>
    
        </div>
        </>
    )
}
