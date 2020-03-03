import React from 'react';
import './Preferences.css';
import PopWindow from '../../common/PopWindow'
import CloseIcon from '@material-ui/icons/Close';
import Field from '../../common/Field';
import Dropdown from '../../common/Dropdown';

const programs = require('../../../data.json').programs
const regions = require('../../../data.json').regions

export default class Preferences extends React.Component {
    state = {
        user: this.props.user
    }
    render() {
        return (
            <PopWindow visible={this.props.visible}>
                <div className="pref-window"> 
                    <img 
                        className="logo" 
                        alt="blossom" 
                        src={require('../../images/blossom-pink.png')} />
                    <div className="pref-content">
                        <div className="pref-name">{this.state.user.name}</div>
                        <div className="user-details-form">
                            <Field title="username" className="fourtyfive marg" align='center' value={this.state.user.username}/>
                            <Field className="fourtyfive marg" align='center' value={this.state.user.name}/>
                            <Field className="fourtyfive marg" type="password" align='center' value={this.state.user.password}/>
                        </div>
                        <div className="grade-form">
                            <span className="grd-text">Grades</span>
                            {
                                this.props.user.grades.map((grade) => (
                                    <div className="grade-form entry" key={grade.coursename}>
                                        <Field className="fourtyfive" align='left' value={grade.course}/>
                                        <Field className="fourtyfive" align='left' value={grade.grade}/>
                                    </div>
                                ))
                            }
                            <div 
                                className="button-add grade noselect"
                                onClick={this.addProgramDropdown}>Add more...</div>
                        </div>
                        <div className="button-form">
                            <div className="program-form">
                                <span className="grd-text">Programs</span>
                                {
                                    this.props.user.programs.map((program) => (
                                        <Dropdown key={program.id} formclassname="drop" choices={programs} defaultValue={program.id}/>
                                    ))
                                }
                                <div 
                                    className="button-add noselect"
                                    onClick={this.addProgramDropdown}>Add more...</div>
                            </div>
                            <div className="region-form">
                                <span className="grd-text">Regions</span>
                                {
                                    this.props.user.regions.map((region) => (
                                        <Dropdown key={region.id} formclassname="drop" choices={regions} defaultValue={region.id}/>
                                    ))
                                }
                                <div 
                                    className="button-add noselect"
                                    onClick={this.addProgramDropdown}>Add more...</div>
                            </div>
                        </div>
                        <div 
                            className="button threequarters marg-bot" 
                            onClick={() => {
                                this.props.setUser(this.state.user)
                                this.props.close()
                            }}>Update Profile</div>
                    </div>
                    <CloseIcon className="close-icon" onClick={this.props.close} />
                </div>
            </PopWindow>
        )
    }
}