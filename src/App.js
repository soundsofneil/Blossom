import React from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import Main from './components/Main';

const users = require('./data.json').users

export default class App extends React.Component {
    state = {
        view: 'splash', // splash | main
        user: users[0] // currently logged in user 
    }

    signIn = (input) => new Promise((res, rej) => {
        // amongst other logic
        const user = users.filter(({username}) => username === input.username)
        if (user.length > 0 && user[0].username === input.username && input.password === user[0].password) {
            console.log('Signing in...')
            this.setState({ view: 'main', user: user[0] })
            res() // data to return goes here
        } else {
            rej('Incorrect credentials...')
        }
    })

    signOut = () => {
        // amongst other logic
        this.setState({ view: 'splash' })
    }

    signUp = (user) => {
        // amongst other logic
        this.setState({ view: 'main', user: user })
    }

    setUser = (user) => {
        this.setState({ user })
    }

    render() {
        return (
            <div>
                { this.state.view === 'splash' ? 
                    (<Splash signIn={this.signIn} signUp={this.signUp}/>) : 
                    (<Main signOut={this.signOut} setUser={this.setUser} user={this.state.user}/>) }
            </div>
        );
    }
}
