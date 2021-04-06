const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const groupMemberSchema = new mongoose.Schema({
    participant: {
          type: [{ type : ObjectId, ref: 'Participant' }],
          required: true,
          trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
       
    }
}, {timestamps: true})



module.exports = mongoose.model('GroupMember', groupMemberSchema)