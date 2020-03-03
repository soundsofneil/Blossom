import React, { Component } from 'react';
import Banner from './Banner'
import UniversityList from './UniversityList'
import MySchoolsList from './MySchoolsList'
import UniversityInfoPop from './UniversityInfoPop'
import Preferences from './Preferences/Preferences'
import AdminPortal from './Preferences/AdminPortal'
import { addToList, removeFromList, fetchUniversities, getReccomendations } from "../../actions/main";

import './styles.css'

class Main extends Component {
    state = {
        view: 'main', // main | pref | admin | learn 
        universities: [],
        mySchools: [],
        popVisible: false,
        adminVisible: false,
        prefVisible: false,
        uniPop: {id: -1, name: "Default University", location: "Default, State", country: "United States", description: "Default description.", programs: [{id: 0, name: "Computer Science", average: 100}, {id: 1, name: "Commerce", average: 0}]},
    }

    constructor(props) {
        super(props);

        this.state.universities = fetchUniversities();
        this.state.universities = getReccomendations(this.state.universities);
        this.state.mySchools = props.user.schools.map((id) => this.state.universities.filter((uni) => uni.id === id)[0])
    }

    render() {
        return (
            <div className="main">
                <div className="main-background"></div>
                <Banner
                    title="Find Your University"
                    subtitle={this.props.user.name}
                    subsubtitle="Preferences"
                    signOut={this.signOut}
                    isAdmin={this.props.user.admin}
                    toggleAdminPanel={this.toggleAdminPanel}
                    togglePreferences={this.togglePreferences}
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
                <UniversityInfoPop 
                    visible={this.state.popVisible} 
                    uni={this.state.uniPop}
                    close={() => this.setState({ popVisible: false })}/>
                <AdminPortal visible={this.state.adminVisible} setUser={this.props.setUser} close={this.toggleAdminPanel}/>
                <Preferences user={this.props.user} setUser={this.props.setUser} visible={this.state.prefVisible} close={this.togglePreferences}/>
            </div>
        );
    }

    signOut = () => {
        console.log("Signing out.");
        this.props.signOut()
    }

    toggleAdminPanel = () => {
        console.log("Bringing up admin panel.");
        this.setState({ adminVisible: !this.state.adminVisible })
    }

    togglePreferences = () => {
        console.log("Bringing up preferences.");
        this.setState({ prefVisible: !this.state.prefVisible })
    }

    learnMore = (uni) => {
        // open university info page
        console.log('Bringing up "learn more" about ' + uni.name)
        this.setState({ popVisible: true, uniPop: uni });
    }
}

export default Main;
