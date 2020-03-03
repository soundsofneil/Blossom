import React, { Component } from 'react';
import UniversityContent from '../UniversityContent'
import Button from "@material-ui/core/Button";
import star_icon from '../../../static/star.png';
import leaf_icon from '../../../static/maple_leaf.png';
import default_icon from '../../../static/default.png';

import './styles.css'

class University extends Component {
    render() {
        const {university, addToList, learnMore} = this.props;

        return (
        <div className="university">
            <div className="university-icon-container" onClick={learnMore}>
                <img className="university-icon" src={require("../../../static/" + university.icon)} alt="University Icon"/>
            </div>
            <div className="university-small-icon-container">
                <img className="university-small-icon" src={this.getSmallIcon(university.country)} alt="Country Icon"/>
            </div>
            <UniversityContent university={university} />
            <div className="university-add-button-container">
                <Button className="university-add-button" variant="outlined" onClick={() => {addToList(university)}}>
                    Add to List
                </Button>
            </div>
        </div>
        );
    }

    getSmallIcon = country => {
        if (country === "Canada") {
            return leaf_icon;
        } else if (country === "United States") {
            return star_icon;
        } else {
            return default_icon
        }
    }
}

export default University;
