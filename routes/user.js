const {Router} = require('express')
const UserController = require('../controllers/user.controllers')
const {checkUser} = require('../middleware/user.mw')
const paginate = require('../middleware/paginate.mw')

const userRouter = Router()

userRouter.post('/', UserController.createUser)
userRouter.get('/', paginate, UserController.getAllUsers)
userRouter.patch('/:userId', UserController.updateUser)
userRouter.patch('/v2/:userId', checkUser, UserController.updateUserInstance)

module.exports = userRouter