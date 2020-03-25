/* express.js - Express server*/
'use strict';
const User = require('../models/user');
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
	// sending a string
	//res.send('This should be the root route!')

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

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
