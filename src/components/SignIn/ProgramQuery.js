import React from 'react';
import Dropdown from '../common/Dropdown';

const programs = require('../../data.json').programs
let range = n => [...Array(n).keys()]

export default class ProgramQuery extends React.Component {
    state = { programs: [programs[0]] } //default

    onProgramChange = ({target: {value}}, idTop) => {
        // Region dropdown
        const program = this.state.programs.filter(({id}) => id === idTop)[0]
        const newPrograms = this.state.programs.filter(({id}) => id !== idTop)
        program.name = value
        newPrograms.push(program)
        this.setState({ programs: newPrograms })
    }

    addProgramDropdown = () => {
        const newPrograms = this.state.programs
        newPrograms.push({ id: this.state.programs.length })
        this.setState({ programs: newPrograms })
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What programs are you interested in?</span>
                {
                    range(this.state.programs.length).map((id) => (
                        <Dropdown key={id} onChange={(e) => this.onProgramChange(e, id)} choices={programs} />
                    ))
                }
                <div 
                    className="button-add noselect"
                    onClick={this.addProgramDropdown}>Add more...</div>
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