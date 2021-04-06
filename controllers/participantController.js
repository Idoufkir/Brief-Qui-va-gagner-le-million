const Participant = require('../models/participantModel')


exports.getOneParticipant = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    res.json({
        participant : req.profile
    })
}

exports.updateOneParticipant = (req, res) => {
    Participant.findByIdAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, participant) => {
        if(err){
            return res.status(400).json({err})
        }

        req.profile.hashed_password = undefined
        req.profile.hashed_password = undefined

        res.json({participant})
    })
}


exports.getAllParticipant = (req, res) => {

    Participant.find().exec((err, participants) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            participants
        })
    })    
}

exports.gerFinalWinner = async (req, res) => {


    let idWinner = req.params.idWinner;
  
    await Participant.findById(idWinner)
            .then(winner => {
                    if (!winner) {
                            res.json({ error: 'winner not found' });
                    }
                  
                    res.send(winner)
            }).catch(err => {
  
                    return res.status(500).send({
                            message: "Error retrieving winner " 
                    });
            });
  
  
  
  }