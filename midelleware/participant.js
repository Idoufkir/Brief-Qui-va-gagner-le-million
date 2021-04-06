const Participant = require("../models/participantModel")

exports.participantById = (req, res, next, id) => {
    Participant.findById(id).exec((err, participant) => {
        if(err || !participant){
            return res.status(404).json({
                error: "Participant not found"
            })
        }

        req.profile = participant
        next()
    })
}