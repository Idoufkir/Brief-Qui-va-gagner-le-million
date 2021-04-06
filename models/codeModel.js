const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    code: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Code', codeSchema)