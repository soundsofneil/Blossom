/* Actions for logging in/signing up, etc */
const axios = require('axios');

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    axios("http://localhost:5000/api/users/check-session")
    .then(res => {
        if (res.status === 200) {
            return res.data;
        }
    })
    .then(data => {
        if (data && data.user) {
            app.setState({ user: data.user });
        } else {
            app.setState({ user: null });
        }
    })
    .catch(error => {
        console.log(error);
    });
};

// A function to log in a user and set the corresponding components
export const signIn = (app, signInComp) => {
    const data = {
        email: signInComp.state.username,
        password: signInComp.state.password
    }

    // send the login request
    axios.post("http://localhost:5000/api/users/login", data).then(res => {
        console.log(res)
        if (res.status === 200) {
            return res.data;
        }
    }).then(data => {
        console.log(data)
        if (data && data.user) {
            app.setState({ user: data.user });
            signInComp.setState({ username: '', password: '', errusername: false, errpassword: false })
        } else {
            app.setState({ user: null });
            signInComp.setState({ errusername: true, errpassword: true })
        }
    }).catch(error => {
        console.log(error);
        signInComp.setState({ errusername: true, errpassword: true })
    });
};

// A function to log out a user
export const signOut = (app) => {
    axios.get("http://localhost:5000/api/users/logout").then(res => {
        app.setState({ user: null });
    }).catch(error => {
        console.log(error);
    });
}
