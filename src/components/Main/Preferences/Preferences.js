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

    addGrades = () => {
        const newGrade = this.state.user
        newGrade.grades.push({ id: this.state.user.grades.length })
        this.setState({ grades: newGrade })
    }

    addProgram = () => {
        const newProgram = this.state.user
        newProgram.programs.push(programs[0])
        this.setState({ programs: newProgram })
    }

    addRegion = () => {
        const newRegion = this.state.user
        newRegion.regions.push(regions[0])
        this.setState({ regions: newRegion })
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
                            <Field placeholder="username" title="username" className="fourtyfive marg" align='center' value={this.state.user.username}/>
                            <Field placeholder="name" className="fourtyfive marg" align='center' value={this.state.user.name}/>
                            <Field placeholder="password" className="fourtyfive marg" type="password" align='center' value={this.state.user.password}/>
                        </div>
                        <div className="grade-form">
                            <span className="grd-text">Grades</span>
                            {
                                this.state.user.grades.map((grade) => (
                                    <div className="grade-form entry" key={grade.coursename}>
                                        <Field placeholder="Course Name" className="fourtyfive" align='left' value={grade.course}/>
                                        <Field placeholder="Grade (%)" className="fourtyfive" align='left' value={grade.grade}/>
                                    </div>
                                ))
                            }
                            <div 
                                className="button-add grade noselect"
                                onClick={this.addGrades}>Add more...</div>
                        </div>
                        <div className="button-form">
                            <div className="program-form">
                                <span className="grd-text">Programs</span>
                                {
                                    this.state.user.programs.map((program) => (
                                        <Dropdown key={program.id} formclassname="drop" choices={programs} defaultValue={program.id}/>
                                    ))
                                }
                                <div 
                                    className="button-add noselect"
                                    onClick={this.addProgram}>Add more...</div>
                            </div>
                            <div className="region-form">
                                <span className="grd-text">Regions</span>
                                {
                                    this.state.user.regions.map((region) => (
                                        <Dropdown key={region.id} formclassname="drop" choices={regions} defaultValue={region.id}/>
                                    ))
                                }
                                <div 
                                    className="button-add noselect"
                                    onClick={this.addRegion}>Add more...</div>
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