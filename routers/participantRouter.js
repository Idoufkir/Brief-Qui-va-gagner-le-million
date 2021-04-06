const express = require('express')
const {getOneParticipant, updateOneParticipant, getAllParticipant, gerFinalWinner} = require('../controllers/participantController')
const {participantById} = require('../midelleware/participant')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')

const router = express.Router()

router.get('/:participantId', [requireSignIn, isAuth, isAdmin], getOneParticipant)
router.put('/:participantId', [requireSignIn, isAuth, isAdmin], updateOneParticipant)

router.get('/allParticipant/:participantId', [requireSignIn, isAuth, isAdmin], getAllParticipant)
router.get('/:idWinner', gerFinalWinner)


router.param("participantId", participantById)


module.exports = router