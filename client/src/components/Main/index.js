import React, { Component } from 'react';
import Banner from './Banner'
import UniversityList from './UniversityList'
import MySchoolsList from './MySchoolsList'
import TextField from "@material-ui/core/TextField";
import UniversityInfoPop from './UniversityInfoPop'
import Preferences from './Preferences/Preferences'
import AdminPortal from './Preferences/AdminPortal'
import { getRankedUniversities, getRecomendedUniversities, search } from "../../actions/main";

import './styles.css'

class Main extends Component {
    state = {
        view: 'main', // main | pref | admin | learn
        loadState: 'Loading...', // 'done' => will show university list
        universities: [],
        showInds: [],
        popVisible: false,
        adminVisible: false,
        prefVisible: false,
        uniPop: {id: -1, name: "Default University", location: "Default, State", country: "United States", description: "Default description.", programs: [{id: 0, name: "Computer Science", average: 100}, {id: 1, name: "Commerce", average: 0}]},
    }

    constructor(props) {
        super(props);
        this.props.history.push("/main");

        console.log("Loading universities...")
        getRankedUniversities().then(universities => {
            const showInds = getRecomendedUniversities(this.props.user, universities);
            this.setState({universities, showInds, loadState: 'done'})
            console.log("...Loading complete!")
        }).catch(err => {
            alert(err)
            console.log('...Error loading university data!')
        })
    }

    render() {
        return (
            <div className="main">
                <div className="main-background">
                    <Banner
                        title={this.props.user.admin ? "Blossom Admin" : "Find Your University"}
                        subtitle={this.props.user.name}
                        subsubtitle={this.props.user.admin ? "Admin Panel" : "Preferences"}
                        signOut={this.props.signOut}
                        isAdmin={this.props.user.admin}
                        toggleAdminPanel={this.toggleAdminPanel}
                        togglePreferences={this.togglePreferences}
                    />
                    {!this.props.user.admin && (
                        <UniversityList
                            universities={this.state.universities}
                            indeces={this.state.showInds}
                            message={this.state.loadState}
                            addToList={this.addToList}
                            learnMore={this.learnMore}
                        />
                    )}
                    {!this.props.user.admin && (
                        <MySchoolsList
                            mySchools={this.props.user.schools.map(mySchool => {return this.state.universities.find(uni => uni.name === mySchool.name)}).filter(uni => uni != null)}
                            removeFromList={this.removeFromList}
                            learnMore={this.learnMore}
                        />
                    )}
                    {!this.props.user.admin && (
                        <div className="main-search-bar-container">
                            <TextField
                                className="main-search-bar"
                                variant="outlined"
                                onChange={({target: {value}}) => this.doSearch(value)}
                                error={false}
                                placeholder="search"
                                type="text"
                            />
                        </div>
                    )}
                </div>
                <UniversityInfoPop
                    visible={this.state.popVisible}
                    uni={this.state.uniPop}
                    close={() => this.setState({ popVisible: false })}/>
                <AdminPortal visible={this.state.adminVisible} setUser={this.props.setUser} close={this.toggleAdminPanel}/>
                <Preferences user={this.props.user} setUser={this.props.setUser} visible={this.state.prefVisible} close={this.togglePreferences}/>
            </div>
        );
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

    doSearch = (query, universities) => {
        this.setState({loadState: 'Loading...'}, () => {
            console.log("Searching universities...")
            search(query, this.state.universities).then(inds => {
                if (inds.length == 0) {
                    this.setState({loadState: 'No results.'})
                    console.log("...Searching complete: No matches found.")
                } else {
                    this.setState({loadState: 'done'})
                    console.log("...Searching complete")
                }
                this.setState({showInds: inds});
            })
        })
    }

    addToList = (uni) => {
        const user = this.props.user

        if (user.schools.find(school => school.name === uni.name)) {
            console.log("Already in list!");
            return;
        }

        user.schools.push({name: uni.name});

        this.props.setUser(user, true).catch(err => {
            alert(err)
        })
    }

    removeFromList = (uni) => {
        const user = this.props.user
        user.schools = user.schools.filter(school => school.name !== uni.name);

        this.props.setUser(user, true).catch(err => {
            alert(err)
        })
    }
}

export default Main;
