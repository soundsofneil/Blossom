import React from 'react';
import Field from '../common/Field';
import CloseIcon from '@material-ui/icons/Close';

let range = n => [...Array(n).keys()]

export default class GradeQuery extends React.Component {
    state = { grades: [{id: 0}] } // placeholder

    onChangeGradeCourse = ({target: {value}}, idTop) => {
        // For the grade course fields
        const grade = this.state.grades.filter(({id}) => id === idTop)[0]
        const newGrades = this.state.grades.filter(({id}) => id !== idTop)
        grade.course = value
        newGrades.push(grade)
        this.setState({ grades: newGrades })
    }

    onChangeGradeNumber = ({target: {value}}, idTop) => {
        // For the grade number fields
        const grade = this.state.grades.filter(({id}) => id === idTop)[0]
        const newGrades = this.state.grades.filter(({id}) => id !== idTop)
        grade.grade = value
        newGrades.push(grade)
        this.setState({ grades: newGrades })
    }

    addGradeField = () => {
        const newGrades = this.state.grades
        newGrades.push({ id: this.state.grades.length })
        this.setState({ grades: newGrades })
    }

    removeGrade = (index) => {
        const newGrade = this.state.grades
        this.setState({ grades: newGrade.slice(0, index).concat(newGrade.slice(index+1))})
    }

    render() {
        return (
            <div className='sign-query-box'>
                <span className='subtitle noselect'>What are your grades like?</span>
                {
                    range(this.state.grades.length).map((id, index) => (
                        <div key={id} className='gradefield'>
                            <Field 
                                className='fourtyfive' 
                                onChange={(e) => this.onChangeGradeCourse(e, id)}
                                align='left' 
                                placeholder='Course Name'/>
                            <Field 
                                className='fourtyfive' 
                                onChange={(e) => this.onChangeGradeNumber(e, id)} 
                                type='number' 
                                align='left' 
                                placeholder='Grade (%)'/>
                            <CloseIcon className='close-field' onClick={() => this.removeGrade(index)} />
                        </div>))
                }
                <div 
                    className='button-add noselect'
                    onClick={this.addGradeField}>Add more...</div>
                <div 
                    className='button threequarters' 
                    onClick={() => {
                        this.props.signUp(this.state.grades)
                    }}>Complete Profile</div>
            </div>
        )
    }
}
