import React, { Component } from 'react';

import './styles.css'

class Banner extends Component {

  render() {
    return (
      <div className="banner">
        <div className="banner-background"> </div>
        <img className="banner-icon" src={require("../../static/logo_blue.png")} alt="Logo"/>
        <div className="banner-sign-out"> Sign Out </div>
        <div className="banner-text">
          <p className="banner-title"> {this.props.title} </p>
          <p className="banner-subtitle"> {this.props.subtitle} </p>
          <p className="banner-subsubtitle"> {this.props.subsubtitle} </p>
        </div>
      </div>
    );
  }

}

export default Banner;
