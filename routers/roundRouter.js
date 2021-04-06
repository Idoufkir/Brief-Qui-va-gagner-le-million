const express = require('express')

const roundController = require('../controllers/roundController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')


const router = express.Router()

router.post('/create/:idGroup', roundController.createRound)
router.get('/:idGroup', roundController.checkParticipantNumber)


router.param('participantId', participantById)



module.exports = router