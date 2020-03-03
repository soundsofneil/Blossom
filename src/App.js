import React from 'react';
import './App.css';
import Splash from './components/Splash/Splash';

export default class App extends React.Component {
    // No state, base component
    render() {
        return (
            <div>
                <Splash />
            </div>
        );
    }
}
