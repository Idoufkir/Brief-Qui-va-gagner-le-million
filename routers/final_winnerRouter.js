const express = require('express')
const finalWinnerController = require('../controllers/final_winnerController')
const {requireSignIn, isAuth} = require('../midelleware/auth')


const router = express.Router()

router.post('/create/:idGroup', finalWinnerController.createFinalWinner)


module.exports = router