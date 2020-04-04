import React from 'react'
import './Splash.css';
import SplashHeaderComponent from './Header/SplashHeaderComponent'
import SplashBodyComponent from './Body/SplashBodyComponent';

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="splash">
                <SplashHeaderComponent signUp={this.props.signUp} signIn={this.props.signIn}/>
                <SplashBodyComponent />
            </div>
        )
    }
}
