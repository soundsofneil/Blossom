const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
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
        // unique: true
    }
})