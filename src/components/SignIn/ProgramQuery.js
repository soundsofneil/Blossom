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

    onChangeProgram = ({target: {value}}, id) => {
        console.log(value, id)
        const newProgram = this.state.programs.map((program) => (program === id) ? parseInt(value) : program)
        this.setState({ programs: newProgram })
    }

    removeProgram = (id) => {
        const newProgram = this.state.programs.filter((program) => program !== id)
        this.setState({ programs: newProgram })
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What programs are you interested in?</span>
                {
                    this.state.programs.map((i) => programs[i]).map((program) => (
                        <Dropdown 
                            key={program.id} 
                            onChange={(e) => this.onChangeProgram(e, program.id)}
                            onRemove={() => this.removeProgram(program.id)}
                            choices={programs.filter((pgm) => !this.state.programs.includes(pgm.id) || pgm.id === program.id)} 
                            defaultValue={program.id} />
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