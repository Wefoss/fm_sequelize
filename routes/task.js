const {Router} = require('express')
const TaskController = require('../controllers/task.controller')
const {checkUser} = require('../middleware/user.mw')

const taskRouter = Router()

taskRouter.post('/:userId', checkUser, TaskController.createTask)
taskRouter.get('/:userId', checkUser, TaskController.getUserTasks)
taskRouter.delete('/:taskId', TaskController.deleteTask)


module.exports = taskRouter