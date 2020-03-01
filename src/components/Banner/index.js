import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

import './styles.css'

class Banner extends Component {

  render() {
    const {title, subtitle, subsubtitle, signOut} = this.props;

    return (
      <div className="banner">
        <div className="banner-background"> </div>
        <img className="banner-icon" src={require("../../static/logo_blue.png")} alt="Logo"/>
        <div className="banner-text">
          <p className="banner-title"> {title} </p>
          <p className="banner-subtitle"> {subtitle} </p>
          <p className="banner-subsubtitle"> {subsubtitle} </p>
        </div>
        <div className="banner-sign-out-button-container">
          <Button className="banner-sign-out-button" onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

}

export default Banner;
