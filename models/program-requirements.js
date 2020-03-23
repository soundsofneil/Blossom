const mongoose = require('mongoose')
const ProgramSchema = require('program.js')
const GradeSchema = require('grade.js')

module.exports = new mongoose.Schema({
    program: ProgramSchema,
    gradeRequirement: GradeSchema
})