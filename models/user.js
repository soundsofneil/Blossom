/* User mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const RegionSchema = require('./region.js')
const ProgramSchema = require('./program.js')
const GradeSchema = require('./grade.js')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
    },
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    }, 
	password: {
		type: String,
		required: true,
		minlength: 6
    },
    regions: [RegionSchema],
    programs: [ProgramSchema],
    grades: [GradeSchema]
})

// This function will run immediately prior to saving the document in the database
// Source: Week 10 lecture
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password to a given one, for example when logging in.
// Source: Week 10 lecture
// Used for logging a user in.
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

module.exports = User = mongoose.model('User', UserSchema)
