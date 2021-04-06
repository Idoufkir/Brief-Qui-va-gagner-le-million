const express = require('express')
const {createGift, giftId, allGifts, getGift} = require('../controllers/giftController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')



const router = express.Router()

router.post('/create', createGift)
router.get('/', allGifts)
router.get('/getGift/:giftId', getGift);

router.param('/participantId', participantById)
module.exports = router