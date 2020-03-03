import React from 'react'
import './SplashBodyComponent.css';

export default function SplashBodyComponent() {
    return (
        <div id='bodySection'>
            <div id='textSection'>
                <div id='welcomeTextBlock'>
                    <span className='welcomeTextHeading'>
                        Find the right university for you.
                    </span>
                    <span className='welcomeText'>
                        Using your grades along with your location and program preferences,
                        we<br/>search through universities and colleges that match your needs.
                    </span>
                </div>
                <div id = 'welcomeTextBlock'>
                    <span className='welcomeTextHeading'>
                        Apply.
                    </span>
                    <span className='welcomeText'>
                        Apply to the universities you like!
                        <br/>We provide easy links to apply to select approved schools!
                    </span>
                </div>
                <div id = 'welcomeTextBlock'>
                    <span className='welcomeTextHeading'>
                        Keep track.
                    </span>
                    <span className='welcomeText'>
                        We keep the universities you've applied to or noted down on your profile,<br/>
                        so you don't have to note them down in an Excel spreadsheet.
                    </span>
                </div>
            </div>
            <div id='imageSection'>
                <img src={require('../../../images/students.jpg')} alt='Group of Students' id='mainImage'/>
                {/* <img src={require('../images/smiling.jpg')} alt='Group of Students' id='mainImage2'/> */}
                {/* <img src={require('../images/laptop.jpg')} alt='Group of Students' id='mainImage3'/> */}
            </div>
        </div>
    )
}
