import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

class MySchoolsList extends Component {

    render() {
        const {mySchools, removeFromList} = this.props;

        return (
            <div className="my-schools-list">
                <h1 className="my-schools-list-title"> My Schools </h1>
                <ul>
                    {mySchools.map(school =>
                        <li className="my-schools-list-school" key={school.id}>
                            <span className="school-list-name">{school.name}</span>
                            <IconButton 
                                className="my-schools-list-delete-button"
                                size='small' 
                                aria-label="delete" 
                                onClick={() => removeFromList(school)}>
                                <CloseIcon className="my-schools-list-delete-button-icon" />
                            </IconButton>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

export default MySchoolsList;
