import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';

// Material UI Specific styles.
const styles = {
    icon: {
        fill: "var(--pink)",
    },
};

const Dropdown = (props) => (
    <FormControl className={props.formclassname || "formdrop"} variant="outlined">
        <div className='form-container'>
            <Select
                native
                className='dropdown'
                inputProps={{
                    style: {fontSize: 13},
                }}
                {...props}
            >
                {props.choices.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </Select>
            <CloseIcon className="close-field" onClick={props.onRemove} />
        </div>
    </FormControl>
);

export default withStyles(styles)(Dropdown);