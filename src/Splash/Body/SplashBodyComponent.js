import React from 'react'
import './SplashBodyComponent.css';

export default function SplashBodyComponent() {
    return (
        <div id='bodySection'>
        <img src={require('../Images/students.jpg')} alt='Group of Students' id='mainImage'/>
        <img src={require('../Images/smiling.jpg')} alt='Group of Students' id='mainImage2'/>
        <img src={require('../Images/laptop.jpg')} alt='Group of Students' id='mainImage3'/>
        
        <div id = 'welcomeTextBlock'>
            <span class = 'welcomeTextHeading'>
                Find the right university for you.
            </span>
            <span class = 'welcomeText'>
                Using your grades along with your location and program preferences,
                we search through universities and colleges that match your needs.
            </span>
        </div>
        <div id = 'welcomeTextBlock2'>
            <span class = 'welcomeTextHeading'>
                Apply.
            </span>
            <span class = 'welcomeText'>
                Apply to the universities you like!
            </span>
            <span class = 'welcomeText'>
                We provide easy links to apply to select approved schools!
            </span>
        </div>
        <div id = 'welcomeTextBlock3'>
            <span class = 'welcomeTextHeading'>
                Keep track.
            </span>
            <span class = 'welcomeText'>
                We keep the universities you've applied to or noted down on your profile,
                so you don't have to note them down in an Excel spreadsheet.
            </span>
        </div>
        </div>
    )
}
