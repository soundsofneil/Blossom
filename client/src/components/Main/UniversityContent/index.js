import React, { Component } from 'react';
import UniversityProgramList from '../UniversityProgramList'

import './styles.css'

class UniversityContent extends Component {

    render() {
        return (
            <div className="university-content" onClick={this.props.learnMore}>
                <div className="university-content-left">
                    <h1 className="university-title"> {this.props.university.name} </h1>
                    <h2 className="university-location"> {this.props.university.location} </h2>
                    <p className="university-description"> {this.props.university.description} </p>
                </div>
                {this.props.university.recommended &&
                    (<div className="university-recommendation"> Recommended based on your profile. </div>)
                }
                <UniversityProgramList programs={this.props.university.programs} />
            </div>
        );
    }
}

export default UniversityContent;
