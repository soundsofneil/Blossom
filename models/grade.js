const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    course: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})