/* Actions for logging in/signing up, etc */

const axios = require('axios');

// A function to send a POST request with the user to be logged in
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
        if (data.user !== "") {
            return data.email;
        }
    }).then(id => {
        // send request for user information
        if (id) {
            axios.get("http://localhost:5000/api/user/" + id).then(res => {
                console.log(res)
                if (res.status === 200) {
                    return res.data;
                }
            }).then(user => {
                console.log(user)
                app.setState({ user });
                signInComp.setState({ username: '', password: '', errusername: false, errpassword: false })
            }).catch(error => {
                console.log(error);
                signInComp.setState({ errusername: true, errpassword: true })
            });
        } else {
            signInComp.setState({ errusername: true, errpassword: true })
        }
    }).catch(error => {
        console.log(error);
        signInComp.setState({ errusername: true, errpassword: true })
    });
};
