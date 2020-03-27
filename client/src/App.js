import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import Main from './components/Main';
import {readCookie, signIn, signOut, signUp} from './actions/user';

import './App.css';

const users = require('./data.json').users

export default class App extends React.Component {
    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
    }

    state = {
        view: 'splash', // splash | main
        user:  null //users[0]// currently logged in user
    }
    /*
    signIn = (input) => {

        // old logic
        return new Promise((res, rej) => {
            const user = users.filter(({username}) => username === input.username)
            if (user.length > 0 && user[0].username === input.username && input.password === user[0].password) {
                console.log('Signing in...')
                this.setState({ view: 'main', user: user[0] })
                console.log(user[0])
                console.log(this.state.user)
                res() // data to return goes here
            } else {
                rej('Incorrect credentials...')
            }
        })
    }

    signOut = () => {
        // amongst other logic
        this.setState({ view: 'splash' })
    }

    signUp = (user) => {
        // amongst other logic
        this.setState({ view: 'main', user: user })
    }
    */

    setUser = (user) => {
        this.setState({ user })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path={["/", "/splash", "/main"] /* any of these URLs are accepted. */ }
                        render={({ history }) => (
                            <div className="app">
                                {this.state.user ?
                                    <Main history={history} signOut={() => signOut(this)} setUser={this.setUser} user={this.state.user}/> :
                                    <Splash history={history} signIn={(signInComp) => signIn(this, signInComp)} signUp={(signInComp) => signUp(this, signInComp)}/>
                                }
                            </div>

                        )}
                    />

                    { /* 404 if URL isn't expected. */}
                    <Route render={() => <div>404 Not found</div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}
