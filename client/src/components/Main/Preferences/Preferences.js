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
        newUsername: this.props.user.username,
        newName: this.props.user.name,
        newPassword: this.props.user.password,
        newGrades: this.props.user.grades.map((grade, i) => {return {id: i, grade: grade.grade, course: grade.course}}),
        newPrograms: this.props.user.programs.map(prog1 => programs.find(prog2 => prog1.program === prog2.name).id),
        newRegions: this.props.user.regions.map(reg1 => regions.find(reg2 => reg1.region === reg2.name).id),
    }

    updateUser = () => {
        const newUser = {
            ...this.props.user,
            username: this.state.newUsername,
            name: this.state.newName,
            password: this.state.newPassword,
            grades: this.state.newGrades,
            programs: this.state.newPrograms,
            regions: this.state.newRegions
        }
        this.props.setUser(newUser).then(() => {
            this.props.close()
        }).catch(err => {
            if (err && err.response && err.response.status == 400) {
                alert("Could not update user: Invalid data!")
            } else {
                alert(err)
            }
        })
    }

    // Grades
    addGrades = () => {
        const newGrade = this.state.newGrades
        const newId = this.state.newGrades.reduce((max, grade) => {return Math.max(max, grade.id)}, -1) + 1
        newGrade.push({ id: newId, course: '', grade: '' })
        this.setState({ newGrades: newGrade })
    }

    onChangeGradeCourse = ({target: {value}}, idTop) => {
        // For the grade course fields
        const grade = this.state.newGrades.filter(({id}) => id === idTop)[0]
        const newGrades = this.state.newGrades.filter(({id}) => id !== idTop)
        grade.course = value
        newGrades.push(grade)
        this.setState({ newGrades: newGrades })
    }

    onChangeGradeNumber = ({target: {value}}, idTop) => {
        // For the grade number fields
        const grade = this.state.newGrades.filter(({id}) => id === idTop)[0]
        const newGrades = this.state.newGrades.filter(({id}) => id !== idTop)
        grade.grade = value
        newGrades.push(grade)
        this.setState({ newGrades: newGrades })
    }

    removeGrade = (id) => {
        const newGrade = this.state.newGrades.filter((grade) => grade.id !== id)
        this.setState({ newGrades: newGrade })
    }

    // Programs
    addProgram = () => {
        const newProgram = this.state.newPrograms
        newProgram.push(programs.filter((pgm) => !this.state.newPrograms.includes(pgm.id))[0].id)
        this.setState({ newPrograms: newProgram })
    }

    onChangeProgram = ({target: {value}}, id) => {
        const newProgram = this.state.newPrograms.map((program) => (program === id) ? parseInt(value) : program)
        this.setState({ newPrograms: newProgram })
    }

    removeProgram = (id) => {
        const newProgram = this.state.newPrograms.filter((program) => program !== id)
        this.setState({ newPrograms: newProgram })
    }

    // Regions
    addRegion = () => {
        const newRegion = this.state.newRegions
        newRegion.push(regions.filter((rgn) => !this.state.newRegions.includes(rgn.id))[0].id)
        this.setState({ newRegions: newRegion })
    }

    onChangeRegion = ({target: {value}}, id) => {
        const newRegion = this.state.newRegions.map((region) => (region === id) ? parseInt(value) : region)
        this.setState({ newRegions: newRegion })
    }

    removeRegion = (id) => {
        const newRegion = this.state.newRegions.filter((region) => region !== id)
        this.setState({ newRegions: newRegion })
    }

    render() {
        return (
            <PopWindow visible={this.props.visible} onClose={this.props.close}>
                <div className='pref-window'>
                    <img
                        className='logo'
                        alt='blossom'
                        src={require('../../images/blossom-pink.png')} />
                    <div className='pref-content'>
                        <div className='pref-name'>{this.state.newName}</div>
                        <div className='user-details-form'>
                            <Field
                                label='username'
                                onChange={({target: {value}}) => this.setState({ newUsername: value })}
                                placeholder='username'
                                title='username'
                                className='fourtyfive marg'
                                align='center'
                                value={this.state.newUsername}/>
                            <Field
                                label='name'
                                onChange={({target: {value}}) => this.setState({ newName: value })}
                                placeholder='name'
                                className='fourtyfive marg'
                                align='center'
                                value={this.state.newName}/>
                            <Field
                                label='password'
                                onChange={({target: {value}}) => this.setState({ newPassword: value })}
                                placeholder='password'
                                className='fourtyfive marg'
                                type='password'
                                align='center'
                                value={this.state.newPassword}/>
                        </div>
                        <div className='grade-form'>
                            <span className='grd-text'>Grades</span>
                            {
                                this.state.newGrades.map((grade) => (
                                    <div className='grade-form entry' key={grade.id}>
                                        <Field
                                            onChange={(e) => this.onChangeGradeCourse(e, grade.id)}
                                            placeholder='Course Name'
                                            className='fourtyfive'
                                            align='left'
                                            value={grade.course}/>
                                        <Field
                                            onChange={(e) => this.onChangeGradeNumber(e, grade.id)}
                                            placeholder='Grade (%)'
                                            className='fourtyfive'
                                            align='left'
                                            value={grade.grade}/>
                                        <CloseIcon className='close-field' onClick={() => this.removeGrade(grade.id)} />
                                    </div>
                                ))
                            }
                            <div
                                className='button-add grade noselect'
                                onClick={this.addGrades}>Add more...</div>
                        </div>
                        <div className='button-form'>
                            <div className='program-form'>
                                <span className='grd-text'>Programs</span>
                                {
                                    this.state.newPrograms.map((i) => programs[i]).map((program) => (
                                        <Dropdown
                                            onChange={(e) => this.onChangeProgram(e, program.id)}
                                            onRemove={() => this.removeProgram(program.id)}
                                            key={program.id}
                                            formclassname='drop'
                                            choices={programs.filter((pgm) => !this.state.newPrograms.includes(pgm.id) || pgm.id === program.id)}
                                            defaultValue={program.id} />
                                    ))
                                }
                                {
                                    this.state.newPrograms.length < programs.length && (
                                        <div
                                            className='button-add noselect'
                                            onClick={this.addProgram}>Add more...</div>
                                    )
                                }
                            </div>
                            <div className='region-form'>
                                <span className='grd-text'>Regions</span>
                                {
                                    this.state.newRegions.map((i) => regions[i]).map((region) => (
                                        <Dropdown
                                            onChange={(e) => this.onChangeRegion(e, region.id)}
                                            onRemove={() => this.removeRegion(region.id)}
                                            key={region.id}
                                            formclassname='drop'
                                            choices={regions.filter((rgn) => !this.state.newRegions.includes(rgn.id) || rgn.id === region.id)}
                                            defaultValue={region.id} />
                                    ))
                                }
                                {
                                    this.state.newRegions.length < regions.length && (
                                        <div
                                            className='button-add noselect'
                                            onClick={this.addRegion}>Add more...</div>
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className='button threequarters marg-bot'
                            onClick={this.updateUser}>Update Profile</div>
                    </div>
                    <CloseIcon className='close-icon' onClick={this.props.close} />
                </div>
            </PopWindow>
        )
    }
}
