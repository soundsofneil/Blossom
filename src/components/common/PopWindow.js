import React from 'react';
import './common.css';

export default class PopWindow extends React.Component {
    state = { visible: this.props.visible || false };

    static getDerivedStateFromProps(props, state) {
        return { visible: props.visible }
    }

    render() {
        return (
            <div className={'pop-container animated fadeIn'} style={{ display: this.state.visible ? 'flex' : 'none' }}>
                <div className='pop-bg'/>
                <div className='pop-box'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}