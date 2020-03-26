import React, { Component } from 'react';
import UniversityContent from '../UniversityContent'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import default_icon from '../../../static/default.png';
import no_image_icon from '../../../static/no-image.png';

import './styles.css'

export default class University extends Component {
    render() {
        const {university, addToList, learnMore} = this.props;

        return (
        <div className="university">
            <div className="university-icon-container" onClick={learnMore}>
                <img className="university-icon" src={this.getImage(university.imageUri)} alt="University Icon"/>
            </div>
            <div className="university-small-icon-container">
                <FontAwesomeIcon className="university-small-icon" color="#3A4664" icon={this.getSmallIcon(university.country)}/>
            </div>
            <UniversityContent university={university} learnMore={learnMore}/>
            <div className="university-add-button-container">
                <Button className="university-add-button" variant="outlined" onClick={() => {addToList(university)}}>
                    Add to List
                </Button>
            </div>
        </div>
        );
    }
        //<img className="university-small-icon" src={this.getSmallIcon(university.country)} alt="Country Icon"/>

    getImage = imageUri => {
        try {
            const image = require(imageUri);
            return image;
        } catch {
            return no_image_icon;
        }
    }

    getSmallIcon = country => {
        if (country === "Canada") {
            return faCanadianMapleLeaf;
        } else if (country === "USA") {
            return faStar;
        } else {
            return default_icon
        }
    }
}
