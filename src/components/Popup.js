import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileButton from './ProfileButton'
import XButton from './XButton'
import BlossomLogo from './BlossomLogo'
import './Popup.css'
export class Layout extends Component {

  render() {
    return (
      <div>
        <div class="popup-div">
          <XButton />
          <BlossomLogo />
          <h1 class="popup-hdr">University of Toronto</h1>
          <h2 style={this.getStyle()}>Toronto, Ontario</h2>
          <p style={this.getStyle()}>The University of Toronto is a globally top-ranked public research university.</p>
          <div>
            <ProfileButton content='Apply'/>
            <ProfileButton content='East Canada'/> 
          </div>
          <div>
            <ProfileButton content='Website'/>
            <ProfileButton content='Computer Science'/> 
          </div>
          <div>
            <ProfileButton content='Twitter'/>
            <ProfileButton content='Commerce'/> 
          </div>

          <img class="popup-img" src={require('./images/uoft.png')} />

        </div>

      </div>
    )
  }

  // For some reason cant get the h2 and p to be white when putting the styles in the css
  getStyle = () => {
    return {
      color: 'white'
    }
  }
}




export default Layout;