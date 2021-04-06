const express = require('express')
const {singin, signup, signout, validationParticipant} = require('../controllers/authController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('./../midelleware/participant')

const router = express.Router()

router.post("/signup", signup)
router.post('/signin', singin)
router.get('/signout', signout)
router.put("/valid/:id", validationParticipant)

router.get('/hello', requireSignIn, (req, res) => {
    res.send("hello there")
})


module.exports = router