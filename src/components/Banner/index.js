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
          <h1> {this.props.title} </h1>
          <h2> {this.props.subtitle} </h2>
          <h3> {this.props.subsubtitle} </h3>
        </div>
      </div>
    );
  }

}

export default Banner;
