const {Router} = require('express')
const UserController = require('./controllers/user.controllers')
const TaskContriller = require('./controllers/task.controller')
const {checkUser} = require('./middleware/user.mw')

const router = Router()

router.post('/user', UserController.createUser)
router.get('/users', UserController.getAllUsers)
router.patch('/user/:id', UserController.updateUser)
router.patch('/user-in/:id', checkUser, UserController.updateUserInstance)

router.post('/user/:id/task', checkUser, TaskContriller.createTask)
router.get('/user/:id/tasks', checkUser, TaskContriller.getUserTasks)

module.exports = router