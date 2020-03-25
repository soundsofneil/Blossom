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
app.post('/add/user', (req, res) => {
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
app.post('/add/uni', (req, res) => {
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
app.get('/get/users', (req, res) => {
	User.find().then((users) => {
		res.send({ users }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// Get all universities in the DB
app.get('/get/unis', (req, res) => {
	University.find().then((universities) => {
		res.send({ universities }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

//-------------------DELETE CALLS---------------------------//
// Delete a particular user by their unique ID
app.delete('/delete/user/:id', (req, res) => {
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


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
