const GroupMember = require('../models/group_membersModel')

function generateCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


exports.createGroupMember =  (req, res) => {

    const groupMember = new GroupMember(req.body)

    groupMember.code = generateCode(4)
    groupMember.participant = [ req.body.participant ] 

    groupMember.save((err, groupMember) =>  {
        
      if(err){
           res.status(400).json({
              error: "Group is exists, Change Your group_code, bad Request !"
          })
      }

      res.status(200).json({
        status: 'succes',
        groupMember: groupMember,
      })
     
    })


}



exports.allGroupMember = (req, res) => {

    GroupMember.find()
    .populate('participant')
    .exec((err, groupmembers) => {
        if(err){
            return res.status(404).json({
                error: 'Group is not found!!'
            })
        }

        res.json({
            groupmembers
        })
    })
}


exports.updateGroupMember= (req, res) => {

    let code = req.params.codeId;
    let new_participant = req.body.participant;

    // check if group exist and there is less than 4 particpant 

    GroupMember.findOne({code : code})
    .then(group => {
            if(!group) {
                return res.status(404).send({
                    message: "group not found with id " + group_code
                });            
            }
            if(group.participant.length > 3) {
                    return res.send({
                        message: "Ops the game is started !"
                    });            
            }
            

            GroupMember.updateOne(
                    { code: code },
                    { $push: { participant: [new_participant] } },
                    function(err, result) {
                      if (err) {
                        res.send(err);
                      } else {
                        res.send(group);
                      }
                    }
                  )

        }).catch(err => {
           
            return res.status(500).send({
                message: "Error retrieving group with id " + code,
            });
        });


}

exports.groupMemberId = (req, res, next, id) => {

    GroupMember.findById(id).exec((err, groupMember) => {

        if(err || !groupMember) {
            return res.status(404).json({
                error: "Group Member not found !"
            })
        }

        req.groupMember = groupMember;
        next()
    })

}

