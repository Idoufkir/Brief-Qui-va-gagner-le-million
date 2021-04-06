const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')


const participantRoundSchema = new mongoose.Schema({

    participant: {
        type: ObjectId,
        ref: "Participant",
        require: true,
        trim: true,
        unique: true
    },
    questiontoken: {
       type: ObjectId,
        ref: "GroupMember",
        require: true,
        trim: true,
        unique: true
    },
    round: {
        type: ObjectId, 
        ref: 'Round',
        trim: true,
        require: true,
        unique: true
    },
    sumscore: {
        type: Number, 
        default: 0
    }
})


module.exports = mongoose.model('ParticipantRound', participantRoundSchema)