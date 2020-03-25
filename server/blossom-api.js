/* express.js - Express server*/
'use strict';
const User = require('../models/user');
const University = require('../models/university');
const { mongoose } = require('../db/mongoose');

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


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
