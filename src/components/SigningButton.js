import React from 'react';
import PopWindow from './common/PopWindow';

export default class SigningButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInVisible: false
        }
    }

    raiseSignIn = () => {
        console.log('hello')
        this.setState({ signInVisible: true })
    }

    render() {
        return (
            <div>
                <PopWindow visible={this.state.signInVisible}/>
                <a href="#" onClick={this.raiseSignIn}>raise sign in</a>
            </div>
        )
    }
}
