const {Groupe} = require('../models')
const _ = require('lodash')

module.exports = async (req, res, next) => {
  try {
    const {body} = req
    
  const value = _.pick(body, ['name', 'imagePath', 'description'])

   const groupe = await  Groupe.create({
   ...value,
    userId: body.userId
    })
     
    res.status(201).send({data:{groupe}})
  } catch (error) {
    next(error)
  }
}