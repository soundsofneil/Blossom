/* Actions for logging in/signing up, etc */
const axios = require('axios');

const programs = require('../data.json').programs
const regions = require('../data.json').regions

// Local function to check the data returned from the server
const checkUser = (user) => {
    return (user.admin != null &&
        user.username != null &&
        user.password != null &&
        user.name != null &&
        user.regions != null &&
        user.programs != null &&
        user.grades != null &&
        user.schools != null);
}

// A function to check if a user is logged in on the session cookie
export const readCookie = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/api/users/check-session")
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .then(data => {
            if (data && data.user) {
                checkUser(data.user) || reject();
                resolve(data.user);
            } else {
                reject();
            }
        })
        .catch(error => {
            reject(error);
        });
    })
};

// A function to log in a user and set the corresponding components
export const signIn = (username, password) => {
    const data = {
        username: username,
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
                checkUser(data.user) || reject()
                resolve(data.user)
            } else {
                reject()
            }
        }).catch(error => {
            if (error.response && error.reponse.status == 401) {
                reject()
                return
            }

            alert('Error: Could not log in!')
            console.log(error);
            console.log(data);
            reject(error)
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
            alert("Error: Could not sign out!")
            console.log(error);
            reject(error)
        });
    })
}

// A function to create a new user
export const signUp = (user) => {
    const data = {
    	username: user.username,
    	name: user.name,
    	password: user.password,
    	regions: user.regions.map(id => {return {region: regions[id].name}}),
    	programs: user.programs.map(id => {return {program: programs[id].name}}),
    	grades: user.grades.map(g => {return {grade: parseInt(g.grade), course: g.course}}),
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
                checkUser(data) || reject()
                resolve(data)
            } else {
                reject()
            }
        }).catch(error => {
            alert("Error: Could not sign up!")
            console.log(error);
            console.log(data);
            reject(error)
        });
    })
}

// A function to modify an existing user
export const modifyUser = (username, userProfile, raw) => {
    const data = raw ? userProfile : {
    	admin: false,
    	username: userProfile.username,
    	name: userProfile.name,
    	password: userProfile.password,
    	regions: userProfile.regions.map(id => {return {region: regions[id].name}}),
    	programs: userProfile.programs.map(id => {return {program: programs[id].name}}),
    	grades: userProfile.grades.map(g => {return {grade: parseInt(g.grade), course: g.course}}),
    	schools: userProfile.schools.map(school => {return {name: school.name}})
    }
    console.log(data)

    return new Promise((resolve, reject) => {
        // send the PUT request
        axios.put("http://localhost:5000/api/user/" + username, data).then(res => {
            if (res.status === 200) {
                return res.data;
            }
        }).then((data) => {
            if (data) {
                checkUser(data) || reject()
                resolve(data)
            }
            else {
                reject()
            }
        }).catch(error => {
            alert("Error: Could not modify user!")
            console.log(error);
            console.log(data);
            reject(error)
        });
    })
}

// A function to get a user profile
export const getUser = (username) => {
    console.log(username)

    return new Promise((resolve, reject) => {
        // send the GET request
        axios.get("http://localhost:5000/api/user/" + username, {username}).then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.data;
            }
        }).then((data) => {
            if (data) {
                checkUser(data) || reject()
                resolve(data)
            }
            else {
                reject()
            }
        }).catch(error => {
            alert("Error: Could not get user!")
            console.log(error);
            reject(error)
        });
    })
}

// A function to get a user profile
export const deleteUser = (username) => {
    console.log(username)

    return new Promise((resolve, reject) => {
        // send the DELETE request
        axios.delete("http://localhost:5000/api/user/" + username, {username}).then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.data;
            }
        }).then((data) => {
            if (data) {
                checkUser(data) || reject()
                resolve(data)
            }
            else {
                reject()
            }
        }).catch(error => {
            alert("Error: Could not delete user!")
            console.log(error);
            reject(error)
        });
    })
}
