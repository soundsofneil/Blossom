import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
    icon: {
        fill: "var(--pink)",
    },
};

const Dropdown = (props) => (
    <FormControl className="formdrop" variant="outlined">
        <Select
            native
            className='dropdown'
            inputProps={{
                style: {fontSize: 13},
            }}
            {...props}
        >
            {props.choices.map((choice) => (
                <option key={choice}>{choice}</option>
            ))}
        </Select>
    </FormControl>
);

export default withStyles(styles)(Dropdown);