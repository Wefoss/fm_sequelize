const {User} = require('../models')

module.exports.createUser = async (req, res, next) => {
  try {
    const {body} = req;
    const createUser = await User.create(body)
    res.status(201).send(createUser)
  } catch (error) {
    next(error)
  }
}