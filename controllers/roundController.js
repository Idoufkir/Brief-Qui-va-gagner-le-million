const Round = require('../models/roundModel')
const Question = require('../models/questionModel')
const GroupMember = require('../models/group_membersModel')


 const createRound = async (req, res) => {

    // check if we have the group and we have  4 players 
     let id_group = req.params.idGroup
      await GroupMember.findById(id_group)
            .then(group => {
                    if (!group) {
                            res.json({ error: 'gtoup not found' });
                    }
                    if (group.participant.length < 1) {
                            res.json({ error: ' you need 2 players ... ' });
                         
                    }

                    let groupmembers = id_group;
                    let question = req.body.question;
                    let participant = req.body.participant;
                    let participant_answer = req.body.participant_answer;
                    // let score = checkParticipantScore(id_group,id_participant);
                    (async () => {
                            let score = await checkParticipantScore(id_group, participant);

                            console.log(score)

                            // console.log(score);

                            // check if the answer is correct then update score 
                            let a = await checkAnswer(participant_answer, question)

                            if (a == true) {
                                    score = score + 10;
                                    console.log(score);

                            }

                    console.log(a);
                        


                            const RoundPush = new Round({

                                groupmembers: groupmembers,
                                    question: question,
                                    participant: participant,
                                    participant_answer: participant_answer,
                                    score: score,


                            });

                            RoundPush
                                    .save()
                                    .then((data) => {
                                            res.send(data);
                                            res.json("Round  successfully saved")

                                    }).catch((err) => res.status(400).json("Error :" + err));
                    })()
            }).catch(err => {

                    return res.status(500).send({
                            message: "Error retrieving group with id " + id_group
                    });
            });



}



const checkParticipantNumber = async (req, res) => {


    let id_group = req.params.idGroup;

    await GroupMember.findById(id_group)
            .then(group => {
                    if (!group) {
                            res.json({ error: 'gtoup not found' });
                    }
                    if (group.participant.length < 3) {
                            res.json({ error: ' you need 4 players to start ... ' });
                         
                    }
                    res.send(group)
            }).catch(err => {

                    return res.status(500).send({
                            message: "Error retrieving group with id " + id_group
                    });
            });



}




async function checkAnswer(participant_answer, question) {

    question = await Question.findById(question)
    if (question.answer == participant_answer) {

            
            return true
            
    }else{
            return false
    }

}



// check if the paticipant has a score 

async function checkParticipantScore(groupmembers, participant) {
    let scoreArray = [0];
    round = await Round.find({
        groupmembers: groupmembers,
            partcipant: participant
    })

    if (round) {

            for (let i = 0; i < round.length; i++) {

                   scoreArray.push(round[i].score)
                    
            }

           

            return Math.max(...scoreArray)
            
    } else {
            return 0
            
    }

}


module.exports = {
    createRound,checkParticipantNumber
};