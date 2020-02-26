import React from 'react';
import PopWindow from './common/PopWindow';
import SignIn from './SignIn'
import SignUp from './SignUp'

export default class SigningButton extends React.Component {
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
            <div>
                <PopWindow visible={this.state.signInVisible}>
                    { this.state.currentView === 'in' ? (
                        <SignIn close={this.closeSignIn} switchView={this.switchView} />
                    ) : <SignUp close={this.closeSignIn} switchView={this.switchView} />}
                </PopWindow>
                <button onClick={this.raiseSignIn}>raise signing</button>
            </div>
        )
    }
}
