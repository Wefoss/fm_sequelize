const {Groupe, User} = require('../models')
const createError = require('http-error')
const _ = require('lodash')

module.exports.postOneGroupe = async (req, res, next) => {
  try {
    const {body} = req
    
  const value = _.pick(body, ['name', 'imagePath', 'description'])

  const user = await User.findByPk(body.userId)  
   if(!user) {
     return next(createError(404, 'User Not Found'))
   }
    
   const groupe = await  Groupe.create({
   ...value,
    
    })
 
   await groupe.addUser(user)
     
    res.status(201).send({data:{groupe}})
  } catch (error) {
    next(error)
  }
}