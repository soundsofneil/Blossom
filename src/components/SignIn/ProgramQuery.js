import React from 'react';
import Dropdown from '../common/Dropdown';

const programs = require('../../data.json').programs

export default class ProgramQuery extends React.Component {
    state = { programs: [0] } //default

    addProgram = () => {
        const newProgram = this.state.programs
        newProgram.push(programs.filter((pgm) => !this.state.programs.includes(pgm.id))[0].id)
        this.setState({ programs: newProgram })
    }

    onChangeProgram = ({target: {value}}, index) => {
        const half = this.state.programs.slice(0, index)
        half.push(parseInt(value))
        this.setState({ programs: half.concat(this.state.programs.slice(index+1)) })
    }

    removeProgram = (index) => {
        const newProgram = this.state.programs
        this.setState({ programs: newProgram.slice(0, index).concat(newProgram.slice(index+1))})
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What programs are you interested in?</span>
                {
                    this.state.programs.map((i) => programs[i]).map((program, index) => (
                        <Dropdown 
                            key={index} 
                            onChange={(e) => this.onChangeProgram(e, index)}
                            onRemove={() => this.removeProgram(index)}
                            choices={programs.filter((pgm) => !this.state.programs.includes(pgm.id) || pgm.id === program.id)} />
                    ))
                }
                <div 
                    className="button-add noselect"
                    onClick={this.addProgram}>Add more...</div>
                <div 
                    className="button threequarters" 
                    onClick={() => {
                        this.props.setPrograms(this.state.programs)
                        this.props.nextSignUpStep()
                    }}>Next Step</div>
            </div>
        )
    }
}