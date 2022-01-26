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

module.exports.updateUser = async (req, res, next) =>{
  try {
    const {body, params:{userId}} = req;
    const [rows, [updatedUser] ] = await User.update(body, {
      where: {id: userId},
      returning:true
    });
    updatedUser.password = undefined;
    res.status(200).send({data:updatedUser});
  } catch (error) {
    next(error)
  }
}

module.exports.updateUserInstance = async (req, res, next) =>{
  try {
    const {body, userInstance} = req;
    //const userInstance = await User.findByPk(id);
    const updatedUser = await userInstance.update(body,{
      returning:true
    });
    updatedUser.password = undefined;
    res.status(200).send({data:updatedUser});
  } catch (error) {
    next(error)
  }
}