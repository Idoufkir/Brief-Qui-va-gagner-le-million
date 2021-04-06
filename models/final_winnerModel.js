const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const finalWinnerSchema = new mongoose.Schema({

    group_member: {
        type: ObjectId,
        required: true,
        trim: true
    },
    finalScore: {
        type: Number,
        trim: true
    },
    participant: {
        type: String,
        required: true,
        trim: true
    },
    gift: {
        type: ObjectId,
        ref: 'Gift',
        required: true,
        trim : true
    }
}, {timestamps: true})

module.exports = mongoose.model('FinalWinner', finalWinnerSchema)