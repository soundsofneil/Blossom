/* University mongoose model */
const mongoose = require('mongoose')
const RegionSchema = require('./region.js')
const ProgramRequirementsSchema = require('./program-requirements.js')

const University = mongoose.model('University', {
	name: {
		type: String,
		required: true,
        minlength: 1,
        unique: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
        minlength: 1,
        trim: true
    },
    ranking: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        enum: [
            'Canada North',
            'Canada East',
            'Canada West',
            'US West',
            'US Central',
            'US South',
            'US East',
            'Hawaii',
            'Alaska'
        ],
        required: true,
    },
    programs: [ProgramRequirementsSchema],
    location: {
		type: String,
		required: true,
        minlength: 1,
        trim: true
    },
    country: {
        type: String,
        enum: ['USA', 'Canada'],
        required: true
    },
    applyWebsite: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    website: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    twitter: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    imageUri: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

module.exports = University