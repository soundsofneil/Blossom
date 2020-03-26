/* express.js - Express server*/
'use strict';
const User = require('../models/user');
const University = require('../models/university');
const { mongoose } = require('../db/mongoose');

// to validate object IDs
const { ObjectID } = require('mongodb');

const log = console.log
log('Express server')

const express = require('express')

const app = express();

const bodyParser = require('body-parser') 
app.use(bodyParser.json())


//Routes

//Main landing page
app.get('/', (req, res) => {
	//sending some HTML
	res.send("<h1>Welcome to Blossom's API</h1>")
})

//-------------------POST (CREATE) CALLS---------------------------//

//Add a new user to the DB
app.post('/api/user', (req, res) => {
	var newUser = new User(); 
	newUser.admin = req.body.admin;
	newUser.email = req.body.email;
	newUser.name = req.body.name;
	newUser.password = req.body.password;
	newUser.regions = req.body.regions;
	newUser.programs = req.body.programs;
	newUser.grades = req.body.grades;
	newUser.schools = req.body.schools;
	newUser.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

//Add a new university to the DB
app.post('/api/uni', (req, res) => {
	var newUniversity = new University(); 
	newUniversity.name = req.body.name;
	newUniversity.description = req.body.description;
	newUniversity.region = req.body.region;
	newUniversity.programs = req.body.programs;
	newUniversity.location = req.body.location;
	newUniversity.country = req.body.country;
	newUniversity.applyWebsite = req.body.applyWebsite;
	newUniversity.website = req.body.website;
	newUniversity.twitter = req.body.twitter;
	newUniversity.imageUri = req.body.imageUri;

	newUniversity.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

//-------------------PUT (UPDATE) CALLS------------------//
// Update a particular user by specifying their email address
// and passing in a JSON body
app.put('/api/user/:email', (req, res) => {
	const email = req.params.email

	User.findOne({ "email": email }) 
    .then((user) => {
       if (user) {
			const id = user.id;
			// Validate id
			if (!ObjectID.isValid(id)) {
				res.status(404).send()
				return;
			}

			// Update a user by their id
			User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((user) => {
				if (!user) {
					res.status(404).send()
				} else {   
					res.send(user)
				}
			}).catch((error) => {
				res.status(400).send() // bad request for changing the user.
			})
	} else {
			res.status(500).send('Could not find user with the email ' + email);
		}
	})
})

// Update a particular university by specifying their name
// and passing in a JSON body
app.put('/api/uni/:name', (req, res) => {
	const name = req.params.name

	University.findOne({ "name": name }) 
    .then((uni) => {
       if (uni) {
			const id = uni.id;
			// Validate id
			if (!ObjectID.isValid(id)) {
				res.status(404).send()
				return;
			}

			// Update a uni by their id
			University.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((uni) => {
				if (!uni) {
					res.status(404).send()
				} else {   
					res.send(uni)
				}
			}).catch((error) => {
				res.status(400).send() // bad request for changing the uni.
			})
	} else {
			res.status(500).send('Could not find university with the name ' + name);
		}
	})
})

//-------------------GET CALLS---------------------------//

// Get all users in the DB
app.get('/api/user', (req, res) => {
	User.find().then((users) => {
		res.send({ users }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// Get all universities in the DB
app.get('/api/uni', (req, res) => {
	University.find().then((universities) => {
		res.send({ universities }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// Get a particular user by their email
app.get('/api/user/:email', (req, res) => {
	const email = req.params.email

	User.findOne({ "email": email }) 
    .then((user) => {
       if (user) {
		   const id = user.id;
			// Validate id immediately.
			if (!ObjectID.isValid(id)) {
				res.status(404).send()  // if invalid id, definitely can't find resource, 404.
				return;  // so that we don't run the rest of the handler.
			}
			// Otherwise, findById
			User.findById(id).then((user) => {
				if (!user) {
					res.status(404).send()  // could not find this user
				} else {
					/// sometimes we wrap returned object in another object:
					res.send(user)
				}
			}).catch((error) => {
				res.status(500).send()  // server error
			})
       } else {
			res.status(500).send('Could not find user with the email ' + email);
       }
    })

})

// Get a particular university by their name
app.get('/api/uni/:name', (req, res) => {
	const name = req.params.name

	University.findOne({ "name": name }) 
    .then((uni) => {
       if (uni) {
		   const id = uni.id;
			// Validate id immediately.
			if (!ObjectID.isValid(id)) {
				res.status(404).send()  // if invalid id, definitely can't find resource, 404.
				return;  // so that we don't run the rest of the handler.
			}
			// Otherwise, findById
			University.findById(id).then((uni) => {
				if (!uni) {
					res.status(404).send()  // could not find this uni
				} else {
					/// sometimes we wrap returned object in another object:
					res.send(uni)
				}
			}).catch((error) => {
				res.status(500).send()  // server error
			})
       } else {
			res.status(500).send('Could not find a university with the name ' + name);
       }
    })

})

//-------------------DELETE CALLS---------------------------//

// Delete a particular user by their email address
app.delete('/api/user/:email', (req, res) => {
	const email = req.params.email

	User.findOne({ "email": email }) 
    .then((user) => {
       if (user) {
			const id = user.id;
			// Validate id
			if (!ObjectID.isValid(id)) {
				res.status(404).send()
				return;
			}

			// Delete a user by their id
			User.findByIdAndRemove(id).then((user) => {
				if (!user) {
					res.status(404).send()
				} else {   
					res.send(user)
				}
			}).catch((error) => {
				res.status(500).send() // server error, could not delete.
			})
	} else {
			res.status(500).send('Could not find user with the email ' + email);
		}
	})
})

// Delete a particular university by their name
app.delete('/api/uni/:name', (req, res) => {
	const name = req.params.name

	University.findOne({ "name": name }) 
    .then((uni) => {
       if (uni) {
		   const id = uni.id;
			// Validate id
			if (!ObjectID.isValid(id)) {
				res.status(404).send()
				return;
			}

			// Delete a university by their id
			University.findByIdAndRemove(id).then((uni) => {
				if (!uni) {
					res.status(404).send()
				} else {   
					res.send(uni)
				}
			}).catch((error) => {
				res.status(500).send() // server error, could not delete.
			})
		} else {
			res.status(500).send('Could not find a university with the name ' + name);
		}
	})
})

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
