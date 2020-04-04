import React, { Component } from 'react';

import './styles.css'

class UniversityProgram extends Component {

    render() {
        const {gradeRequirement, program} = this.props.program;

        return (
            <div className="university-program">
                <h2 className="university-program-title"> {program} </h2>
                {(gradeRequirement <= 100 && gradeRequirement > 0) ?
                    (<p className="university-program-average"> {parseInt(gradeRequirement)}% admission average </p>) :
                    (<p className="university-program-average"> Unknown admission average </p>)
                }
            </div>
        );
    }

}

export default UniversityProgram;
