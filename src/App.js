import React from 'react';
import './App.css';
import SigningButton from './components/SigningButton';

export default class App extends React.Component {
    // No state, base component
    render() {
        return (
            <div>
                <SigningButton />
            </div>
        );
    }
}