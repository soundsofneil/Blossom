import React, { Component } from 'react';
import Banner from '../Banner'
import UniversityList from '../UniversityList'
import MySchoolsList from '../MySchoolsList'

import './styles.css'

class Main extends Component {
  state = {
    universities: [
      {id: 0, name: "University of Toronto", location: "Toronto, Ontario", country: "Canada", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", recommended: true, programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 1, name: "Harvard University", location: "Cambridge, Massachusetts", country: "United States", description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts.", recommended: true, programs: [{id: 0, name: "Computer Science", average: 97}, {id: 1, name: "Commerce", average: 93}], icon: "harvard.png"},
      {id: 2, name: "McGill University", location: "Montreal, Quebec", country: "Canada", description: "McGill University is a public university in McGill, Quebec, Canada. Founded in 1821 by royal charter", programs: [{id: 0, name: "Computer Science", average: 85}, {id: 1, name: "Commerce", average: 90}], icon: "mcgill.png"}
    ],
    mySchools: [
      {id: 0, name: "University of Toronto"},
      {id: 4, name: "New York University"}
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
          signOut={this.signOut}
        />
        <UniversityList
          universities={this.state.universities}
          addToList={this.addToList}
        />
        <MySchoolsList
          mySchools={this.state.mySchools}
          removeFromList={this.removeFromList}
        />
      </div>
    );
  }

  signOut = () => {
    console.log("Signing out.");
  }

  addToList = uni => {
    const mySchools = this.state.mySchools;

    if (mySchools.find(u => u.id === uni.id)) {
      return;
    }

    console.log("Adding " + uni.name + " to the list!");

    const newItem = {
      id: uni.id,
      name: uni.name
    }

    mySchools.push(newItem);

    this.setState(
      {mySchools}
    )
  }

  removeFromList = uni => {
    const mySchools = this.state.mySchools.filter(u => u.id !== uni.id);

    console.log("Removing " + uni.name + " from the list!");

    this.setState(
      {mySchools}
    )
  }

  fetchUniversities = () => {

    // fetch data here
    const universities = [
      {id: 0, name: "University of Toronto", location: "Toronto, Ontario", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
      {id: 1, name: "Harvard University", location: "Cambridge, Massachusetts", description: "Harvard University is a private Ivy League research University in Cambridge, Massachusetts.", programs: [{id: 0, name: "Computer Science", average: 97}, {id: 1, name: "Commerce", average: 93}], icon: "uoft.png"},
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
