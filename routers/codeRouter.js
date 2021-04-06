const express = require('express')
const {createCode, allCodes} = require('../controllers/codeController')
const {requireSignIn, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')

const router = express.Router()

 
router.get('/:participantId', allCodes)
router.post('/create/:participantId' ,createCode)

router.param('/participantId', participantById)

module.exports = router