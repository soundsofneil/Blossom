/* express.js - Express server*/
'use strict';
const User = require('../models/user');
const { mongoose } = require('../db/mongoose');

const log = console.log
log('Express server')

const express = require('express')

const app = express();


//Routes
app.get('/', (req, res) => {
	// sending a string
	//res.send('This should be the root route!')

	//sending some HTML
	res.send('<h1>This should be the root route!</h1>')
})

// Error codes
app.get('/problem', (req, res) => {
	// Default error status code is 500
	res.status(500).send('There was a problem on the server')
})


// Sending some JSON
app.get('/api', (req, res) => {
	// User.find()
	// 	.then(function(doc) {
	// 		res.send({items: doc});
	// 	});
	//object converted to JSON string
	res.json([{
		name: 'John',
		year: 3,
		courses: ['csc309', 'csc301']
	},
	{
	name: 'Billy',
	year: 3,
	courses: ['csc309', 'csc301']
	}])
})

app.get('/store', (req, res) => {
	var database = [];
	User.find({}, function(err, foundData) {
		if (err) {
			console.log('error');
			res.status(500).send();
		}
		else{
			if (foundData.length == 0) {
				var responseObject = undefined;
				res.status(404).send(responseObject);
			}
			else{
				res.send(foundData);
			}
		}
	});
});

app.post('/store', (req, res) => {
	var newUser = new User(); 
	newUser.email = '3neil.kelkar@mail.utoronto.ca';
	newUser.name = 'Neil';
	newUser.password = 'password';
	newUser.regions = [{region: 'Canada North'}];
	newUser.programs = [{program:'Commerce'}];
	newUser.grades = { grade: 100, course: 'CSC373'}
	newUser.save(function(err, savedObject) {
		console.log(savedObject);
		if (err) {
			console.log("error");
			console.log(newUser);
			res.status(500).send();
		}
		else{
			res.send(savedObject);
		}
	});
})

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
