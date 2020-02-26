import React from 'react';
import './SignIn.css';
import CloseIcon from '@material-ui/icons/Close';
import Field from './common/Field';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default class SignUp extends React.Component {
    signUp = () => {
        console.log('sign in');
    }

    signUpGoogle = () => {
        console.log('sign in google');
    }

    render() {    
        return (
            <div id="sign-in-container">
                <img className="logo" alt="blossom" src={require('../images/blossom-pink.png')} />
                <div className="sign-info-box">
                    <span className="title noselect">blossom</span>
                    <Field placeholder="username" type="text" style={{marginTop: '14px', width: '100%'}} />
                    <Field placeholder="name" type="text" style={{marginTop: '12px',width: '100%'}} />
                    <Field placeholder="password" type="password" style={{marginTop: '12px',width: '100%'}} />
                    <a className="button" onClick={this.signUp}>Sign Up</a>
                    <a className="button-goog" onClick={this.signUpGoogle}>
                        <FontAwesomeIcon color="#3A4664" icon={faGoogle}/>&nbsp; Sign Up with Google
                    </a>
                    <a className="button-up noselect" onClick={this.props.switchView}>Have an account? Sign In.</a>
                </div>
                <CloseIcon className="close-icon" onClick={this.props.close} />
            </div>
        )
    }
}
