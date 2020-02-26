import React from 'react';
import './common.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const color = {
    darkpink: "#FFBBBD",
    pink: "#FFDBDC",
};

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
            margin='dense'
            inputProps={{ style: {textAlign: 'center'} }}
            {...props}
        />
    </ThemeProvider>
);