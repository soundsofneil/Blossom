/* Actions for logging in/signing up, etc */

const axios = require('axios');

// A function to send a POST request with the user to be logged in
export const signIn = (app, input) => {
    const data = {
        email: input.username,
        password: input.password
    }

    const request = new Request("http://localhost:5000/api/users/login", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Connection": "keep-alive"
        }
    });

    // Send the request with fetch()
    //fetch(request)
    axios.post("http://localhost:5000/api/users/login", data)
    .then(res => {
        console.log(res)
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        console.log(json)
        if (json.user !== "") {
            console.log("user okay")
            app.setState({ user: json.user });
        }
    })
    .catch(error => {
        console.log(error);
    });

    if (app.state.user) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
};
