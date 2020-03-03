import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProfileButton.css'

export class ProfileButton extends Component {


  render() {
    return (
        <button id="profile-button">{this.props.content}</button>
    )
  }
}


export default ProfileButton;

