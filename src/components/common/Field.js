import React from 'react';
import './common.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const color = {
    darkpink: "#FFBBBD",
    pink: "#FFDBDC",
};

// Some interesting stuff here with the material UI framework
const theme = createMuiTheme({
    palette: {
        primary: {
            main: color.darkpink, // click
        },
        text: {
            primary: color.pink, // text
        },
    },
});

export default (props) => (
    <ThemeProvider theme={theme}>
        <TextField
            className='field'
            margin='dense'
            inputProps={{ style: {textAlign: props.align || 'center'}, min: 1, max: 100 }} // specific
            {...props}
        />
    </ThemeProvider>
);