const Gift = require('../models/giftModel')


exports.createGift = (req, res) => {

    const gift = new Gift(req.body)

    gift.save((err, gift) => {
      if(err){
          return res.status(400).json({
              error: "bad Request !"
          })
      }

      res.json({
        gift
      })
    })
}



exports.giftId = (req, res, next, id) => {

    gift.findById(id).exec((err, gift) => {

        if(err || !gift) {
            return res.status(404).json({
                error: "Gift not found !"
            })
        }

        req.gift = gift;
        next()
    })

} 


exports.allGifts = (req, res) => {

    Gift.find().exec((err, gifts) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            gifts
        })
    })
}


exports.getGift = (req,res) =>{

    Gift.findById(req.params.giftId)
 .then(gift => {
   if (!gift) {
           res.json({ error: 'gift not found' });
   }
 
   res.send(gift)
}).catch(err => {

   return res.status(500).send({
           message: "Error retrieving gift " 
   });
});

}