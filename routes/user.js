const {Router} = require('express')
const UserController = require('../controllers/user.controllers')
const {checkUser} = require('../middleware/user.mw')

const userRouter = Router()

userRouter.post('/', UserController.createUser)
userRouter.get('/', UserController.getAllUsers)
userRouter.patch('/:userId', UserController.updateUser)
userRouter.patch('/v2/:userId', checkUser, UserController.updateUserInstance)

module.exports = userRouter