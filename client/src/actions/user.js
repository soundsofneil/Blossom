/* Actions for logging in/signing up, etc */
const axios = require('axios');

const programs = require('../data.json').programs
const regions = require('../data.json').regions

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    axios.get("http://localhost:5000/api/users/check-session")
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
            // reset fields on success
            signInComp.setState({ username: '', password: '', name: '', regions: [], programs: [], stage: 0, errusername: false, errpassword: false })
                console.log("Successfully signed in!")
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

// A function to create a new user
export const signUp = (app, signInComp) => {
    const data = {
    	admin: false,
    	email: signInComp.state.username,
    	name: signInComp.state.name,
    	password: signInComp.state.password,
    	regions: signInComp.state.regions.map(id => {return {region: regions[id].name}}),
    	programs: signInComp.state.programs.map(id => {return {program: programs[id].name}}),
    	grades: signInComp.state.grades.map(g => {return {grade: g.grade, course: g.course}}),
    	schools: []
    }

    // send the login request
    axios.post("http://localhost:5000/api/user", data).then(res => {
        console.log(res)
        if (res.status === 200) {
            console.log("Successfully created user!")
            return res.data;
        }
    }).then(() => {
        signIn(app, signInComp)
    }).catch(error => {
        console.log(error);
    });
}


// A function to create a new user
export const modifyUser = (app, user) => {
    console.log(user)
    const data = {
    	admin: false,
    	email: user.username,
    	name: user.name,
    	password: user.password,
    	regions: user.regions.map(id => {return {region: regions[id].name}}),
    	programs: user.programs.map(id => {return {program: programs[id].name}}),
    	grades: user.grades.map(g => {return {grade: g.grade, course: g.course}}),
    	schools: user.schools.map(school => {return {name: school.name}})
    }

    // send the login request
    axios.put("http://localhost:5000/api/user/" + data.email, data).then(res => {
        console.log(res)
        if (res.status === 200) {
            return res.data;
        }
    }).then(() => {
        if (data) {
          app.setState({user: data})
          console.log("Successfully updated user!")
        }
        else {
          alert('Could not update user profile!')
        }
    }).catch(error => {
        console.log(error);
    });
}
