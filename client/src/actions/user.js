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
export const signIn = (username, password) => {
    const data = {
        email: username,
        password: password
    }

    return new Promise((resolve, reject) => {
        // send the login request
        axios.post("http://localhost:5000/api/users/login", data).then(res => {
            if (res.status === 200) {
                return res.data;
            }
        }).then(data => {
            if (data && data.user) {
                resolve(data.user)
            } else {
                reject()
            }
        }).catch(error => {
            console.log(error);
            reject()
        });
    })
};

// A function to log out a user
export const signOut = () => {
    // send the logout request
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/api/users/logout").then(res => {
            resolve()
        }).catch(error => {
            console.log(error);
            reject()
        });
    })
}

// A function to create a new user
export const signUp = (user) => {
    const data = {
    	admin: false,
    	email: user.username,
    	name: user.name,
    	password: user.password,
    	regions: user.regions.map(id => {return {region: regions[id].name}}),
    	programs: user.programs.map(id => {return {program: programs[id].name}}),
    	grades: user.grades.map(g => {return {grade: g.grade, course: g.course}}),
    	schools: []
    }

    return new Promise((resolve, reject) => {
        // send the POST request
        axios.post("http://localhost:5000/api/user", data).then(res => {
            if (res.status === 200) {
                return res.data
            }
        }).then(data => {
            if (data) {
                resolve(data)
            } else {
                reject()
            }
        }).catch(error => {
            console.log(error);
            reject()
        });
    })
}

// A function to modify an existing user
export const modifyUser = (user) => {
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

    return new Promise((resolve, reject) => {
        // send the PUT request
        axios.put("http://localhost:5000/api/user/" + data.email, data).then(res => {
            if (res.status === 200) {
                return res.data;
            }
        }).then((data) => {
            if (data) {
                resolve(data)
            }
            else {
                reject()
            }
        }).catch(error => {
            console.log(error);
            reject()
        });
    })
}

// A function to get a user profile
export const getUser = (username) => {
    console.log(username)

    return new Promise((resolve, reject) => {
        // send the login request
        axios.get("http://localhost:5000/api/user/" + username, {email: username}).then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.data;
            }
        }).then((data) => {
            if (data) {
                resolve(data)
            }
            else {
                reject()
            }
        }).catch(error => {
            console.log(error);
            reject()
        });
    })
}
