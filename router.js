const {Router} = require('express')
const UserController = require('./controllers/user.controllers')

const router = Router()

router.post('/user', UserController.createUser)

module.exports = router