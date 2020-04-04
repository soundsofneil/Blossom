import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

class MySchoolsList extends Component {

    render() {
        const {mySchools, removeFromList, learnMore} = this.props;
        
        return (
            <div className="my-schools-list">
                <h1 className="my-schools-list-title"> My Schools </h1>
                <ul>
                    {mySchools.map((school, i) =>
                        <li className="my-schools-list-school" key={i}>
                            <Button className="school-list-name" onClick={() => learnMore(school)}>{school.name}</Button>
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
