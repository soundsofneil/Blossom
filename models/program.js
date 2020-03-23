const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    program: {
        type: String,
        enum: [
            'Computer Science',
            'Commerce',
            'English',
            'Chemistry',
            'Statistics',
            'Mathematics',
            'Biology',
            'Life Sciences',
            'Philosophy',
            'Physics',
            'Business'
        ],
        required: true,
        // unique: true
    }
})