import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProfileButton.css'

// The 6 buttons 
export class ProfileButton extends Component {
  render() {
    return (
        <button id="profile-button">{this.props.content}</button>
    )
  }
}


export default ProfileButton;

