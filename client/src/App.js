import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import Main from './components/Main';
import {readCookie, signIn, signOut, signUp, modifyUser} from './actions/user';

import './App.css';

//const users = require('./data.json').users

export default class App extends React.Component {
    constructor(props) {
        super(props);

        readCookie().then(user => {
            console.log("Already logged in!")
            this.setState({ user });
        }).catch(err => {
            console.log("Not logged in.")
            this.setState({ user: null });
        }); // sees if a user is logged in.
    }

    state = {
        user:  null //users[0]// currently logged in user
    }

    signIn = (username, password) => {
        console.log("Logging in...")
        return new Promise((res, rej) =>  {
            signIn(username, password).then(user => {
                console.log("...Successfully logged in!")
                this.setState({user})
                res(user)
            }).catch(err => {
                console.log("...Incorrect credentials!")
                rej()
            })
        })
    }

    signOut = () => {
        console.log("Logging out...")
        return new Promise((res, rej) => {
            signOut().then(() => {
                console.log("...Successfully logged out!")
                this.setState({ user: null })
                res()
            }).catch(() => {
                console.log("...Could not log out!")
                rej()
            })
        })
    }

    signUp = (user) => {
        console.log("Signing up...")
        return new Promise((res, rej) =>  {
            signUp(user).then(user => {
                console.log("...Successfully signed up!")
                this.setState({user})
                res(user)
            }).catch(err => {
                console.log("...Could not sign up!")
                rej()
            })
        })
    }

    setUser = (user) => {
        console.log("Modifying user...")
        return new Promise((res, rej) => {
            modifyUser(this.state.user.username, user).then(user => {
                console.log("...Successfully modified user!")
                this.setState({user})
                res(user)
            }).catch(err => {
                console.log("...Could not modify user!")
                rej()
            })
        })
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
                                    <Main history={history} app={this} user={this.state.user} signOut={this.signOut} setUser={this.setUser}/> :
                                    <Splash history={history} signIn={this.signIn} signUp={this.signUp}/>
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
