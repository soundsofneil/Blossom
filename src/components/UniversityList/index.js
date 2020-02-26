import React, { Component } from 'react';

import University from '../University'

import './styles.css'

class UniversityList extends Component {

  render() {
    return (
      <div className="university-list">
        {this.props.universities.map(uni =>
          <University
            key={uni.id}
            university={uni}
          />)}
      </div>
    );
  }

}

export default UniversityList;
