import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

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
            {school.name}
            <div className="my-schools-list-delete-button-container">
            <IconButton className="my-schools-list-delete-button" size='small' aria-label="delete" onClick={() => removeFromList(school)}>
              x
            </IconButton>
            </div>
          </li>
        )}
        </ul>
      </div>
    );
  }

}

export default MySchoolsList;
