import React from 'react';
import './PopWindow.css';
import { NONAME } from 'dns';

export default class PopWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    openWindow = () => {
        console.log('hello');
    }

    closeWindow = () => {
        console.log('goodbye');
    }

    render() {
        return (
            <div className='pop-container' style={{ display: this.props.visible ? 'flex' : 'none' }}>
                <div className='pop-box' />
            </div>
        )
    }
}