import React, { Component } from 'react';

import University from '../University'

import './styles.css'

class UniversityList extends Component {

    render() {
        const {universities, indeces, message} = this.props;

        return (
        <div className="university-list">
            {message === 'done' ?
            indeces.slice(0,20).map(i =>
            <University
                key={universities[i]._id}
                university={universities[i]}
                addToList={this.props.addToList}
                learnMore={() => this.props.learnMore(universities[i])}
            />) :
            <div className="university-list-empty">
                {message}
            </div>}
        </div>
        );
    }

}

export default UniversityList;
