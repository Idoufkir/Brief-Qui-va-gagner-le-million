const express = require('express')
const {createGroupMember, allGroupMember, updateGroupMember} = require('../controllers/group_memberController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')


const router = express.Router()

router.post('/create/:participantId', [requireSignIn, isAuth], createGroupMember)
router.put('/rejoindre/:codeId', updateGroupMember)
router.get('/:participantId', [requireSignIn, isAuth], allGroupMember)

router.param('participantId', participantById)


module.exports = router