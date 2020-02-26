import React from 'react';
import './SignIn.css';
import CloseIcon from '@material-ui/icons/Close';
import Field from './common/Field';
import Dropdown from './common/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const dropdown1 = ['Computer Science', 'Commerce', 'Chemistry', 'Statistics', 'Mathematics', 'Biology', 'Life Sciences', 'Philosophy']
const dropdown2 = ['Canada North', 'Canada East', 'Canada West', 'US West', 'US Central', 'US South', 'US East', 'Hawaii', 'Alaska']


export default class SignIn extends React.Component {
    state = {
        stage: 2, // entry:0 || signup1:1 || signup2:2 || signup3:3
        dropdown1Count: 1,
        dropdown2Count: 1,
        gradeCount: 1,
        username: '',
        name: '',
        password: '',
        errusername: false,
        errname: false,
        errpassword: false
    }

    signIn = () => {
        console.log('sign in');
        if (this.state.username === 'user' && this.state.password === 'password') {
            // should log in, move to main page.
            this.setState({ username: '', password: '', errusername: false, errpassword: false })
            this.props.close()
        } else {
            this.setState({ errusername: true, errpassword: true })
        }
    }

    signInGoogle = () => {
        console.log('sign in google');
    }

    nextSignUpStep = () => {
        console.log('next stage');
        if (this.state.stage === 0) {
            (['username', 'name', 'password']).forEach((wch) => {
                if (this.state[wch].length <= 2) {
                    this.setState({[`err${wch}`]: true})
                } else {
                    this.setState({[`err${wch}`]: false})
                }
            })
            if (this.state.password.length > 2
                && this.state.name.length > 2
                && this.state.username.length > 2) {
                this.setState({ stage: this.state.stage + 1 })
            }
        } else {
            this.setState({ stage: this.state.stage + 1 })
        }
    }

    signUp = () => {
        console.log('sign up');
        // should complete profile, move to main page.
        this.setState({ username: '', password: '', name: '', stage: 0 })
        this.props.close()
        this.props.switchView()
    }

    signUpGoogle = () => {
        console.log('sign up google');
    }

    renderEntry = () => (
        <div className="sign-info-box">
            <span className="title noselect">blossom</span>
            <Field 
                className="full" 
                value={this.state.username} 
                onChange={({target: {value}}) => this.setState({username: value})} 
                error={this.state.errusername} 
                placeholder="username" 
                type="text" />
            {
                this.props.type === 'out' && (
                <Field 
                    className="full" 
                    value={this.state.name} 
                    onChange={({target: {value}}) => this.setState({name: value})}
                    error={this.state.errname} 
                    placeholder="name" 
                    type="text" />)
            }
            <Field 
                className="full" 
                value={this.state.password} 
                onChange={({target: {value}}) => this.setState({password: value})} 
                error={this.state.errpassword} 
                placeholder="password" 
                type="password" />

            <div 
                className="button full" 
                onClick={
                    this.props.type === 'out' ? 
                    this.nextSignUpStep : this.signIn}>
                Sign {this.props.type === 'out' ? 'Up' : 'In'}</div>
            <div
                className="button-goog full" 
                onClick={
                    this.props.type === 'out' ? 
                    this.signUpGoogle : this.signInGoogle }>
                <FontAwesomeIcon color="#3A4664" icon={faGoogle}/>&nbsp; Sign&nbsp; 
                    {this.props.type === 'out' ? 'Up' : 'In'} with Google
            </div>
            <div className="button-up noselect" onClick={this.props.switchView}>
                {this.props.type === 'out' ? 
                'Have an account? Sign In.' : 'No account? Sign Up.'}
            </div>
        </div>
    )

    renderSignUp1 = () => (
        <div className="sign-query-box">
            <span className="subtitle noselect">What programs are you interested in?</span>
            {
                new Array(this.state.dropdown1Count).fill(
                    <Dropdown choices={dropdown1}/>)
            }
            <div 
                className="button-add noselect"
                onClick={() => this.setState({ dropdown1Count: this.state.dropdown1Count + 1})}>Add more...</div>
            <div 
                className="button threequarters" 
                onClick={this.nextSignUpStep}>Next Step</div>
        </div>
    )

    renderSignUp2 = () => (
        <div className="sign-query-box">
            <span className="subtitle noselect">What regions are you interested in?</span>
            {
                new Array(this.state.dropdown2Count).fill(
                    <Dropdown choices={dropdown2}/>)
            }
            <div 
                className="button-add noselect"
                onClick={() => this.setState({ dropdown2Count: this.state.dropdown2Count + 1})}>Add more...</div>
            <div 
                className="button threequarters" 
                onClick={this.nextSignUpStep}>Next Step</div>
        </div>
    )

    renderSignUp3 = () => (
        <div className="sign-query-box">
            <span className="subtitle noselect">What are your grades like?</span>
            {
                new Array(this.state.gradeCount).fill((
                    <div className="gradefield">
                        <Field className="fourtyfive" align='left' placeholder="Course Name"/>
                        <Field className="fourtyfive" type="number" align='left' placeholder="Grade (%)"/>
                    </div>))
            }
            <div 
                className="button-add noselect"
                onClick={() => this.setState({ gradeCount: this.state.gradeCount + 1})}>Add more...</div>
            <div 
                className="button threequarters" 
                onClick={this.signUp}>Complete Profile</div>
        </div>
    )

        
    render() {    
        return (
            <div id="sign-in-container">
                <img 
                    className="logo" 
                    alt="blossom" 
                    src={require('../images/blossom-pink.png')} />
                {
                    this.state.stage === 0 ? this.renderEntry() :
                    this.state.stage === 1 ? this.renderSignUp1() :
                    this.state.stage === 2 ? this.renderSignUp2() :
                    this.state.stage === 3 && this.renderSignUp3()
                }
                <CloseIcon className="close-icon" onClick={this.props.close} />
            </div>
        )
    }
}
