import React, { Component } from 'react';
import Banner from '../Banner'
import UniversityList from '../UniversityList'

import './styles.css'

class Main extends Component {
  state = {
    universities: [
      {id: 0, name: "University of Toronto", location: "Toronto, Ontario", country:"Canada", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", recommended: true, programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 1, name: "University of Toronto", location: "Toronto, Ontario", country:"Canada", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 2, name: "University of Toronto", location: "Toronto, Ontario", country:"Canada", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"}
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

  fetchUniversities = () => {

    // fetch data here
    const universities = [
      {id: 0, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 1, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 2, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"}
    ]

    this.setState({ universities: universities });

    this.getReccomendations();

    return universities;
  }

  getReccomendations = () => {
    const universities = this.state.universities;

    universities[0].recommended = true;

    this.setState({ universities: universities });
  }

}

export default Main;
