const {Router} = require('express')
const UserController = require('./controllers/user.controllers')

const router = Router()

router.post('/user', UserController.createUser)
router.get('/users', UserController.getAllUsers)
router.patch('/user/:id', UserController.updateUser)
router.patch('/user-in/:id', UserController.updateUserInstance)

module.exports = router