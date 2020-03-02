import React, { Component } from 'react';
import Banner from '../Banner'
import UniversityList from '../UniversityList'
import MySchoolsList from '../MySchoolsList'
import { addToList, removeFromList, fetchUniversities, getReccomendations, getMySchoolsList } from "../../actions/main";

import './styles.css'

class Main extends Component {
  state = {
    universities: [],
    mySchools: []
  }

  constructor() {
    super();

    this.state.universities = fetchUniversities();
    this.state.universities = getReccomendations(this.state.universities);
    this.state.mySchools = getMySchoolsList();
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
          addToList={(uni) => {addToList(this, uni)}}
        />
        <MySchoolsList
          mySchools={this.state.mySchools}
          removeFromList={(uni) => {removeFromList(this, uni)}}
        />
      </div>
    );
  }

  signOut = () => {
    console.log("Signing out.");
  }
}

export default Main;
