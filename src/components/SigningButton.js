import React from 'react';
import PopWindow from './common/PopWindow';
import SignIn from './SignIn'

export default class SigningButton extends React.Component {
    state = { signInVisible: true, currentView: 'in' }
    
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
                    <SignIn 
                        close={this.closeSignIn} 
                        switchView={this.switchView} 
                        type={this.state.currentView} />
                </PopWindow>
                <button onClick={this.raiseSignIn}>raise signing</button>
            </div>
        )
    }
}
