import React from 'react'
import './SplashHeaderComponent.css';
import PopWindow from '../../common/PopWindow';
import SignIn from '../../SignIn/SignIn'

export default class SplashHeaderComponent extends React.Component {
    state = { signInVisible: false, currentView: 'in' }
    
    raiseSignIn = () => {
        this.setState({ signInVisible: true })
    }

    closeSignIn = () => {
        this.setState({ signInVisible: false })
    }

    switchView = () => {
        this.setState({ currentView: this.state.currentView === 'in' ? 'out' : 'in' })
    }

    render() {
        return (
            <div id='headerSection'>
                <img src={require('../../../images/blossom.png')} alt='Blossom Logo' id='logoImage'/>
                <span class='sloganText'>
                    Can't find the right University?
                </span>
                <span class='sloganText'>
                    We can help.
                </span>
                <span id='titleText'>
                    blossom
                </span>
                <button id='signInButton' class='noselect' onClick={this.raiseSignIn}>Sign In or Sign Up</button>
                <PopWindow visible={this.state.signInVisible}>
                    <SignIn 
                        close={this.closeSignIn} 
                        switchView={this.switchView} 
                        type={this.state.currentView} />
                </PopWindow>
            </div>
        )
    }
}
