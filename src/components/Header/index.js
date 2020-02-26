import React, { Component } from 'react';

import './styles.css'

class Header extends Component {

  render() {
    return (
      <div className="header">
        <h1> {this.props.title} </h1>
        <h2> {this.props.subtitle} </h2>
        <h3> {this.props.subsubtitle} </h3>
      </div>
    );
  }

}

export default Header;
