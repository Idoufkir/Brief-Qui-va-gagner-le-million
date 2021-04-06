const Code = require('../models/codeModel')


exports.createCode = (req, res) => {

    const code = new Code(req.body);

    code.save((err, code) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

         res.status(200).json({
            status: 'succes',
            code: code,
          })

      
    })

}

exports.codeId = (req, res, next, id) => {

    Code.findById(id).exec((err, code) => {

        if(err || !code) {
            return res.status(404).json({
                error: "Code not found !"
            })
        }

        req.code = code;
        next()
    })

} 


exports.allCodes = (req, res) => {

    Code.find().exec((err, codes) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            codes
        })
    })
}
