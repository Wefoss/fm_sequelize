const {Router} = require('express')
const UserController = require('./controllers/user.controllers')
const TaskContriller = require('./controllers/task.controller')

const router = Router()

router.post('/user', UserController.createUser)
router.get('/users', UserController.getAllUsers)
router.patch('/user/:id', UserController.updateUser)
router.patch('/user-in/:id', UserController.updateUserInstance)

router.post('/user/:id/task', TaskContriller.createTask)

module.exports = router