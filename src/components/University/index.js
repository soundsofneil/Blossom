import React, { Component } from 'react';
import UniversityContent from '../UniversityContent'

import './styles.css'

class University extends Component {

  render() {
    console.log("../../static/" + this.props.university.icon);
    return (
      <div className="university">
        <div className="university-icon-container">
          <img className="university-icon" src={require("../../static/" + this.props.university.icon)} alt="University Icon"/>
        </div>
        <UniversityContent university={this.props.university} />
      </div>
    );
  }

}

export default University;
