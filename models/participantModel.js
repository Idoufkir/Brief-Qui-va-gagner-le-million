const mongoose = require("mongoose")
const crypto = require('crypto')   
const {v1: uuid} = require('uuid')   


const participantSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        unnique: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    is_valid: {
        type: Boolean,
        default: 'false'
    },
    online: {
        type: Boolean,
        default:'false'
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    salt: {
        type: String
    }
}, {timestamps: true})

// Crypter le mot pass et participantSchema
// 1- creat virtuel password in participantSchema

participantSchema.virtual("password")

.set(function(password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.cryptPassword(password)
})

.get(function(){
    return this._password
})
participantSchema.methods = {

    authenticate: function(plainText){
       return this.cryptPassword(plainText) === this.hashed_password
    },
    cryptPassword: function(password){
        if(!password) return '';

        try{
            return crypto.createHash('sha1', this.salt)
                    .update(password)
                    .digest('hex')

        }catch(error){
            return ''
        }
    }
}

module.exports = mongoose.model('Participant', participantSchema)