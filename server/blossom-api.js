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

//-------------------POST CALLS---------------------------//

//Add a new user to the DB
app.post('/api/user', (req, res) => {
	var newUser = new User(); 
	newUser.email = req.body.email;
	newUser.name = req.body.name;
	newUser.password = req.body.password;
	newUser.regions = req.body.regions;
	newUser.programs = req.body.programs;
	newUser.grades = req.body.grades;
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

//-------------------GET CALLS---------------------------//

// Get all users in the DB
app.get('/api/user', (req, res) => {
	User.find().then((users) => {
		res.send({ users }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// Get a particular user by their ID
app.get('/api/user/:id', (req, res) => {
	const id = req.params.id

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

})

// Get all universities in the DB
app.get('/api/uni', (req, res) => {
	University.find().then((universities) => {
		res.send({ universities }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// Get a particular university by their ID
app.get('/api/uni/:id', (req, res) => {
	const id = req.params.id

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
			res.send(uni)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})

//-------------------DELETE CALLS---------------------------//

// Delete a particular user by their unique ID
app.delete('/api/user/:id', (req, res) => {
	const id = req.params.id

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
})

// Delete a particular university by their unique ID
app.delete('/api/uni/:id', (req, res) => {
	const id = req.params.id

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
})

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
