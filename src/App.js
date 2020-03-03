import React from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import Main from './components/Main';

export default class App extends React.Component {
    state = {
        view: 'main' // splash | main 
    }

    signIn = () => {
        // amongst other logic
        this.setState({ view: 'main' })
    }

    signOut = () => {
        // amongst other logic
        this.setState({ view: 'splash' })
    }

    render() {
        return (
            <div>
                { this.state.view === 'splash' ? 
                    (<Splash signIn={this.signIn}/>) : 
                    (<Main signOut={this.signOut}/>) }
            </div>
        );
    }
}
