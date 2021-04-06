const { MessageRequestResponseStatusCode } = require('nexmo')
const  ParticipantRound = require('../models/participant_roundModel')
const QuestionToken = require('../models/question_tokenModel')
const Round = require('../models/roundModel')


// function return runs is parId = parId the document Participant Round
async function checkRound(id){
    try{
          const checkId = await Round.findOne(id)

          return checkId
      }catch(err){
          console.log(err);
      }
}

// function return id participant in document Group Member
async function checkGroupMember(id){
    try{
          const checkId = await QuestionToken.findOne(id)

          return checkId
      }catch(err){
          console.log(err);
      }
}

// function return id participant in document Group Member
async function checkQuestionToken(id){
    try{
          const checkId = await QuestionToken.findOne(id)

          return checkId.score
      }catch(err){
          console.log(err);
      }
}

async function CheckRoundParticipant (idR, idP) {
    try{ 

        const checkId = await QuestionToken.findOne({_id: idR}, {$in: idP})

        return checkId

    }catch(err){
        console.log(err);
    }
}




exports.createParticipantRound =(req, res) => {

    const participantRound = new ParticipantRound(req.body)
    participantRound.save(async(err, participantRound) => {
    
        const  result = await checkGroupMember(participantRound.questiontoken)

        if(!(result.participant = participantRound.participant)){
              res.status(404).json({
                  error: "Particiant is undifined"
              })
        }

        const  resultRound = await checkRound(participantRound.round)
        console.log(resultRound);

      
        const filtreParticipant = await CheckRoundParticipant(participantRound.questiontoken, participantRound.participant)
        console.log(JSON.stringify(filtreParticipant));
        
        const scoreWinner = await checkQuestionToken(JSON.stringify(filtreParticipant[1]))
            console.log(scoreWinner);
        
        if(err ){
            return res.status(404).json({
                error: "Participant Round is not found !!!"
            })
        }

        res.json({
            participantRound: participantRound
        })
       
         
    })
}


