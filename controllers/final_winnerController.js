const FinalWinner = require('./../models/final_winnerModel')
const Gift = require('./../models/giftModel')
const Round = require('./../models/roundModel')


const createFinalWinner = (req, res) => {

    let group_member = req.params.idGroup;

    // console.log(group_member);
  
    (async () => {
      let round = await  getHighScore(group_member);
    //   console.log(round);
      let finalScore = Math.max.apply(Math, round.map(function(round) { return round.score }))
    console.log(finalScore);
      let finalWinner = await winner(group_member, finalScore);
      console.log(finalWinner);
  
      let gift = await getRandomGift()
  
  
  
      const FinalWinnerPush = new FinalWinner({
  
        group_member: group_member,
        finalScore: finalScore,
        participant: finalWinner,
        gift: gift,
  
      });
  
      FinalWinnerPush
        .save()
        .then((data) => {
          res.send(data);
          res.json("FinalWinner successfully added")
  
        }).catch((err) => res.status(400).json("Error :" + err));
  
  
    })()
  
  
  
  }
  

  async function getRandomGift() {
  
     gift =  await Gift.find()
     let randomGift = gift[Math.floor(Math.random() * gift.length)];
     return randomGift._id;
  
   
  
  
  }
  
  async function getHighScore(groupmembers) {
    round = await Round.find({
        groupmembers: groupmembers
    })
  
    
    return round;
  
  
  
  }
  
  async function winner(groupmembers, finalScore) {
    round = await Round.findOne({
        groupmembers: groupmembers,
        score: finalScore
      })
  
      return round.participant;
  }
  
  
  module.exports = {
    createFinalWinner
  }

