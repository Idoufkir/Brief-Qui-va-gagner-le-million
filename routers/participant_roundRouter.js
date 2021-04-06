const express = require('express')
const {createParticipantRound} = require('../controllers/participant_roundController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')
const {questionTokenId} = require('../controllers/questionTokenController')




const router = express.Router()

router.post('/create/:questionToken/:participantId', [requireSignIn, isAuth], createParticipantRound)
// router.get('/', allGroupMember)

router.param('participantId', participantById)
router.param('questionToken', questionTokenId)

module.exports = router