const express = require('express')
const {createQuestion, allQuestion, getRandomQuestion} = require('../controllers/questionController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('./../midelleware/participant')


const router = express.Router()

router.post('/create/', [requireSignIn, isAuth, isAdmin], createQuestion)
router.get('/random/', getRandomQuestion)
router.get('/', allQuestion)

router.param('participantId', participantById)
module.exports = router