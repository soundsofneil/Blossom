import React from 'react';
import PopWindow from '../../common/PopWindow'
import CloseIcon from '@material-ui/icons/Close';
import Field from '../../common/Field';

const users = require('../../../data.json').users;

export default class AdminPortal extends React.Component {
    state = {
        view: 'search', // search | create | update
        searchUsername: '',
        username: '',
        name: '',
        password: '',
        modifyUser: users[0]
    }

    openModifyUser = () => {
        const user = users.filter(({username}) => username === this.state.searchUsername)[0]
        if (user) {
            console.log('Moving to update user.')
            this.setState({ view: 'update', searchUsername: '', modifyUser: user, username: user.username, name: user.name, password: user.password })
        } else {
            console.log('No such user exists.')
        }
    }

    openCreateUser = () => {
        console.log('Moving to create user.')
        this.setState({ view: 'create', searchUsername: '' })
    }

    setUser = () => {
        console.log('Updating user.')
        const user = this.state.modifyUser;
        user.username = this.state.username;
        user.name = this.state.name;
        user.password = this.state.password;
        this.props.setUser(user)
        this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
        this.props.close()
    }

    deleteUser = () => {
        // more logic when server exists
        console.log('Deleting user.')
        this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
        this.props.close()
    }

    createUser = () => {
        // more logic when server exists
        console.log('Creating user.')
        this.setState({ view: 'search', username: '', name: '', password: '', searchUsername: '' })
        this.props.close()
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
                                    <Field placeholder="Search for a username..." onChange={({target: {value}}) => this.setState({ searchUsername: value })} align="left"/>
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
                                    <div className="button threequarters modify" onClick={this.setUser}>Confirm Changes</div>
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