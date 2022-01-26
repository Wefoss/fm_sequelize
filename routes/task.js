const {Router} = require('express')
const TaskContriller = require('../controllers/task.controller')
const {checkUser} = require('../middleware/user.mw')

const taskRouter = Router()

taskRouter.post('/:userId', checkUser, TaskContriller.createTask)
taskRouter.get('/:userId', checkUser, TaskContriller.getUserTasks)


module.exports = taskRouter