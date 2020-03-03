import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Material UI Specific styles.
const styles = {
    icon: {
        fill: "var(--pink)",
    },
};

const Dropdown = (props) => (
    <FormControl className={props.formClassName || "formdrop"} variant="outlined">
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
    </FormControl>
);

export default withStyles(styles)(Dropdown);