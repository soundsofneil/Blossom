import React, { Component } from 'react';
import UniversityProgramList from '../UniversityProgramList'

import './styles.css'

class UniversityContent extends Component {

  render() {
    return (
      <div className="university-content">
        <div className="university-content-left">
          <h1 className="university-title"> {this.props.university.name} </h1>
          <h2 className="university-location"> {this.props.university.location} </h2>
          <p className="university-description"> {this.props.university.description} </p>
          <p className="university-recommendation"> {this.recommendationString(this.props.university.recommended)} </p>
        </div>
        <UniversityProgramList programs={this.props.university.programs} />
      </div>
    );
  }

    recommendationString = rec => {
      if (rec) {
        return "Recommended based on your profile."
      } else {
        return ""
      }
    }
}

export default UniversityContent;
