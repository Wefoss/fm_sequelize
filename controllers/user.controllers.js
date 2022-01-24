const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createUser = await User.create(body);
    res.status(201).send(createUser);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      // where: {
      //  firstName: "Tohn"
      // },
      attributes: {
        exclude: ['password']
      }
    });
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {body, params:{id}} = req
    const [rows, [userUpdate]] = await User.update(body, {
      where: {id},
      returning: true
    })
    userUpdate.password = undefined
    res.status(200).send(userUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const {body, params:{id}} = req
    const userInstance = await User.findByPk(id)
    const userUpdate = await userInstance.update(body, {
           returning: true
    })
    userUpdate.password = undefined
    res.status(200).send(userUpdate);
  } catch (error) {
    next(error);
  }
};