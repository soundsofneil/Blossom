import React from 'react';
import { motion } from 'framer-motion'
import './common.css';

export default class PopWindow extends React.Component {
    state = { 
        isNone: !this.props.visible
    };

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible && !this.props.visible) {
            setTimeout(() => {
                console.log('yo')
                this.setState({ isNone: true })
            }, 500)
        } else if (prevProps.visible !== this.props.visible && this.props.visible) {
            this.setState({ isNone: false })
        }
    }

    render() {
        return (
            <motion.div className={'pop-container'} style={{ display: this.state.isNone ? 'none' : 'flex' }} animate={{ opacity: this.props.visible ? 1 : 0 }}>
                <div className='pop-bg' onClick={this.props.onClose} />
                <div className='pop-box'>
                    {this.props.children}
                </div>
            </motion.div>
        )
    }
}