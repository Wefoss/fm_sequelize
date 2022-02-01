const {Router} = require('express')
const userRouter = require('./user')
const taskRouter = require('./task')
const groupeRouter = require('./groupe')


const router = Router()

router.use('/users', userRouter)
router.use('/tasks', taskRouter)
router.use('/groupes', groupeRouter)

module.exports = router