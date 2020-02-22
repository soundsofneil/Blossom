import React from 'react';

export default class SigningButton extends React.Component {
    raiseSignIn() {
        console.log('hello')
    }
    render() {
        return (
            <a href="#" onClick={this.raiseSignIn}>raise sign in</a>
        )
    }
}
