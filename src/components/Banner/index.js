import React, { Component } from 'react';

import Header from '../Header'

import './styles.css'

class Banner extends Component {

  render() {
    return (
      <div className='banner'>
        <Header
          title="Find Your University"
          subtitle="John Doe"
          subsubtitle="Preferences"
        />
      </div>
    );
  }

}

export default Banner;
