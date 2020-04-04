import React from 'react';
import PopWindow from '../../common/PopWindow'
import CloseIcon from '@material-ui/icons/Close';
import Field from '../../common/Field';
import {signUp, modifyUser, getUser, deleteUser} from '../../../actions/user';

//const users = require('../../../data.json').users;

export default class AdminPortal extends React.Component {
    state = {
        view: 'search', // search | create | update
        searchUsername: '',
        username: '',
        name: '',
        password: '',
        modifyUser: null
    }

    openModifyUser = () => {
        getUser(this.state.searchUsername).then(user => {
            console.log('Moving to update user.')
            this.setState({ view: 'update', searchUsername: '', modifyUser: user, username: user.username, name: user.name, password: user.password })
        }).catch((err) => {
            if (err && err.response && err.response.status == 404) {
                alert("No such user exists!")
            } else {
                alert(err)
            }
        })
    }

    openCreateUser = () => {
        console.log('Moving to create user.')
        this.setState({ view: 'create', searchUsername: '' })
    }

    modifyUser = () => {
        console.log("Modifying user...")
        const user = {
            ...this.state.modifyUser,
            username: this.state.username,
            name: this.state.name,
            password: this.state.password
        }
        modifyUser(this.state.modifyUser.username, user, true).then(() => {
            console.log("...Successfully modified user!")
            this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
            this.props.close()
        }).catch((err) => {
            if (err && err.response && err.response.status == 400) {
                alert("Could not update user: Invalid data!")
            } else {
                alert(err)
            }
            console.log("...Could not modify user!")
        })
    }

    deleteUser = () => {
        console.log("Deleting user...")
        deleteUser(this.state.username).then(() => {
            console.log("...Successfully deleted user!")
            this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
            this.props.close()
        }).catch((err) => {
            alert(err)
            console.log("...Could not delete user!")
        })
    }

    createUser = () => {
        const user = {
        	username: this.state.username,
        	name: this.state.name,
        	password: this.state.password,
        	regions: [],
        	programs: [],
        	grades: [],
        	schools: []
        }
        console.log("Creating user...")
        signUp(user).then(() => {
            console.log("...Successfully created user!")
            this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
            this.props.close()
        }).catch((err) => {
            alert(err)
            console.log("...Could not create user!")
        })
    }

    render() {
        return (
            <PopWindow visible={this.props.visible} onClose={() => {
                this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
                this.props.close()
            }}>
                <div className="pref-window">
                    <img
                        className="logo"
                        alt="blossom"
                        src={require('../../images/blossom-pink.png')} />
                        {
                            this.state.view === 'search' ? (
                                <div className="pref-content">
                                    <span className="admin-header">Admin Panel</span>
                                    <Field value={this.state.searchUsername} placeholder="Search for a username..." onChange={({target: {value}}) => this.setState({ searchUsername: value })} align="left"/>
                                    <div className="button threequarters modify" onClick={this.openModifyUser}>Modify Profile</div>
                                    <div className="button threequarters create" onClick={this.openCreateUser}>Create Profile</div>
                                </div>
                            ) : this.state.view === 'create' ? (
                                <div className="pref-content">
                                    <span className="admin-header">Admin Panel</span>
                                    <Field placeholder="username" onChange={({target: {value}}) => this.setState({ username: value })} align="left"/>
                                    <Field placeholder="name" onChange={({target: {value}}) => this.setState({ name: value })} align="left"/>
                                    <Field placeholder="password" type="password" onChange={({target: {value}}) => this.setState({ password: value })} align="left"/>
                                    <div className="button threequarters modify" onClick={this.createUser}>Create User</div>
                                </div>
                            ) : this.state.view === 'update' ? (
                                <div className="pref-content">
                                    <span className="admin-header">Admin Panel</span>
                                    <Field defaultValue={this.state.modifyUser.username} onChange={({target: {value}}) => this.setState({ username: value })} align="left"/>
                                    <Field defaultValue={this.state.modifyUser.name} onChange={({target: {value}}) => this.setState({ name: value })} align="left"/>
                                    <Field defaultValue={this.state.modifyUser.password} type="password" onChange={({target: {value}}) => this.setState({ password: value })} align="left"/>
                                    <div className="button threequarters modify" onClick={this.modifyUser}>Confirm Changes</div>
                                    <div className="button threequarters delete" onClick={this.deleteUser}>Delete User</div>
                                </div>
                            ) : null
                        }
                    <CloseIcon className="close-icon" onClick={() => {
                        this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
                        this.props.close()
                    }} />
                </div>
            </PopWindow>
        )
    }
}
