import React, { Component } from 'react';
import UniversityProgram from '../UniversityProgram'

import './styles.css'

class UniversityProgramList extends Component {

  render() {
    return (
      <div className="university-program-list">
        {this.props.programs.map(prog =>
          <UniversityProgram key={prog.id} program={prog}/>)}
      </div>
    );
  }

}

export default UniversityProgramList;