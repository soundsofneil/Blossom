import React, { Component } from 'react';
import Banner from './Banner'
import UniversityList from './UniversityList'
import MySchoolsList from './MySchoolsList'
import TextField from "@material-ui/core/TextField";
import UniversityInfoPop from './UniversityInfoPop'
import Preferences from './Preferences/Preferences'
import AdminPortal from './Preferences/AdminPortal'
import { getRankedUniversities, getRecomendedUniversities, sortPrograms, search } from "../../actions/main";

import './styles.css'

class Main extends Component {
    state = {
        view: 'main', // main | pref | admin | learn
        universities: [],
        showInds: [],
        userRecInds: [],
        loadMessage: 'Loading...',
        listVisible: false,
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
            this.updateList(this.props.user, universities)
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
                            user={this.props.user}
                            universities={this.state.universities}
                            indeces={this.state.showInds}
                            visible={this.state.listVisible}
                            loadMessage={this.state.loadMessage}
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
                <Preferences user={this.props.user} setUser={this.setUser} visible={this.state.prefVisible} close={this.togglePreferences}/>
            </div>
        );
    }

    setUser = user => {
        return this.props.setUser(user).then( user => {
            this.updateList(user, this.state.universities)
        })
    }

    updateList = (user, universities) => {
        const userRecInds = getRecomendedUniversities(user, universities);
        universities = sortPrograms(user, universities)

        if (userRecInds.length > 0) {
            this.setState({universities, userRecInds, showInds: userRecInds, listVisible: true, loadMessage: ''})
        } else {
            const topinds = [...Array(20).keys()]
            this.setState({universities, userRecInds, showInds: topinds, listVisible: true, loadMessage: "There were no matches so we're showing you the top ranked universities."})
        }

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
        if (query.length > 0) {
            this.setState({listVisible: false, loadMessage: 'Loading...'}, () => {
                console.log("Searching universities...")
                search(query, this.state.universities).then(inds => {
                    if (inds.length == 0) {
                        this.setState({listVisible: false, loadMessage: 'No results.'})
                        console.log("...Searching complete: No matches found.")
                    } else {
                        this.setState({listVisible: true, loadMessage: ''})
                        console.log("...Searching complete")
                    }
                    this.setState({showInds: inds});
                })
            })
        } else {
            this.setState({showInds: this.state.userRecInds})
        }
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
