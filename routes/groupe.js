const {Router} = require('express')
const GroupeController = require('../controllers/groupe.controller')
// const {checkUser} = require('../middleware/user.mw')

const groupeUser = Router()

groupeUser.post('/', GroupeController.postOneGroupe)
// groupeUser.get('/:userId', checkUser, groupeController.postOneGroupe)

module.exports = groupeUser