const mongoose = require('mongoose')
const ProgramSchema = require('./program.js')
const GradeSchema = require('./grade.js')

module.exports = new mongoose.Schema({
    program: ProgramSchema,
    gradeRequirement: GradeSchema,
    website: {
        type: String,
		required: true,
        minlength: 1,
        trim: true
    }
})