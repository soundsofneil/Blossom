import React, { Component } from 'react';
import Banner from './Banner'
import UniversityList from './UniversityList'
import MySchoolsList from './MySchoolsList'
import { addToList, removeFromList, fetchUniversities, getReccomendations, getMySchoolsList } from "../../actions/main";

import './styles.css'

class Main extends Component {
    state = {
        view: 'main', // main | pref | admin | learn 
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
            <div className="main-background"></div>
            <Banner
                title="Find Your University"
                subtitle="John Doe"
                subsubtitle="Preferences"
                signOut={this.signOut}
                bringUpAdminPanel={this.bringUpAdminPanel}
                bringUpPreferences={this.bringUpPreferences}
            />
            <UniversityList
                universities={this.state.universities}
                addToList={(uni) => {addToList(this, uni)}}
                learnMore={this.learnMore}
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
        this.props.signOut()
    }

    bringUpAdminPanel = () => {
        console.log("Bringing up admin panel.");
    }

    bringUpPreferences = () => {
        console.log("Bringing up preferences.");
    }

    learnMore = (uni) => {
        // open university info page
        console.log('Bringing up "learn more" about ' + uni.name)
    }
}

export default Main;
