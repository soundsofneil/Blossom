import React, { Component } from 'react';

import University from '../University'

import './styles.css'

class UniversityList extends Component {

    render() {
        const {universities, indeces} = this.props;

        return (
        <div className="university-list">
            {this.props.loadMessage.length > 0 &&
                <div className="university-list-message"> {this.props.loadMessage} </div>
            }
            {this.props.visible &&
            indeces.slice(0,20).map(i =>
                <University
                    key={universities[i]._id}
                    university={universities[i]}
                    addToList={this.props.addToList}
                    learnMore={() => this.props.learnMore(universities[i])}
                />)
            }
        </div>
        );
    }
}

export default UniversityList;
