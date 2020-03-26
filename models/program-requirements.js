const mongoose = require('mongoose')
const ProgramSchema = require('./program.js')
const GradeSchema = require('./grade.js')

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
    },
    gradeRequirement: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    website: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})