import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BlossomLogo.css'

export class BlossomLogo extends Component {

  render() {
    return (
        <img id="logo-pink" src={require('./images/blossom-pink.png')} />
    )
  }
}


export default BlossomLogo;