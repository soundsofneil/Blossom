import React, { Component } from 'react';
import Banner from '../Banner'
import UniversityList from '../UniversityList'

import './styles.css'

class Main extends Component {
  state = {
    universities: [
      {id: 0, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 1, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 2, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"}
    ]
  }

  render() {
    return (
      <div className="main">
        <div className="main-background">
        </div>
        <Banner
          title="Find Your University"
          subtitle="John Doe"
          subsubtitle="Preferences"
        />
        <UniversityList
          universities={this.state.universities}
        />
      </div>
    );
  }

}

export default Main;
