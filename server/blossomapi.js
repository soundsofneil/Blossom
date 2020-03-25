/* express.js - Express server*/
'use strict';
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
	// object converted to JSON string
	res.send([{
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

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
