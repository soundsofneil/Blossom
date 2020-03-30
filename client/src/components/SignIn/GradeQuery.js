import React from 'react';
import Field from '../common/Field';
import CloseIcon from '@material-ui/icons/Close';

let range = n => [...Array(n).keys()]

export default class GradeQuery extends React.Component {
    state = { grades: [{id: 0, course: '', grade: '' }] } // placeholder

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
        const newId = this.state.grades.reduce((max, grade) => {return Math.max(max, grade.id)}, -1) + 1
        newGrades.push({ id: newId, course: '', grade: '' })
        this.setState({ grades: newGrades })
    }

    removeGrade = (id) => {
        const newGrade = this.state.grades.filter((grade) => grade.id !== id)
        this.setState({ grades: newGrade })
    }

    cleanGrades = () => {
        const newGrades = this.state.grades.filter((grade) => grade.grade.length > 0 && grade.course.length > 0)
        return newGrades
    }

    render() {
        return (
            <div className='sign-query-box'>
                <span className='subtitle noselect'>What are your grades like?</span>
                {
                     this.state.grades.map((grade) => (
                        <div key={grade.id} className='gradefield'>
                            <Field
                                className='fourtyfive'
                                onChange={(e) => this.onChangeGradeCourse(e, grade.id)}
                                align='left'
                                placeholder='Course Name'/>
                            <Field
                                className='fourtyfive'
                                onChange={(e) => this.onChangeGradeNumber(e, grade.id)}
                                type='number'
                                align='left'
                                placeholder='Grade (%)'/>
                            <CloseIcon className='close-field' onClick={() => this.removeGrade(grade.id)} />
                        </div>))
                }
                <div
                    className='button-add noselect'
                    onClick={this.addGradeField}>Add more...</div>
                <div
                    className='button threequarters'
                    onClick={() => {
                        this.props.signUp(this.cleanGrades())
                    }}>Complete Profile</div>
            </div>
        )
    }
}
