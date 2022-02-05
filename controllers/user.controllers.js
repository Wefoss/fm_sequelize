const createError = require('http-errors')
const { User, Task } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createUser = await User.create(body);
    if(!createUser) {
      throw new Error('400. Bad Request')
    }
    res.status(201).send({data: [createUser]});
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    
    const {params:{userId}} = req
    const user = await User.findByPk(userId, {
      attributes: {exclude: ['password']}
    })
    if(!user) {
       const error = createError(404, 'User Not Found')
     return  next(error)
    }
    res.status(200).send({data:user})
  } catch (error) {
    next(error);
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const {pagination} = req
    const users = await User.findAll({
      // where: {
      //  firstName: "Tohn"
      // },
      attributes: {
        exclude: ['password']
      },
      ...pagination
    });
    if(!users) {
      return  next(createError(404, 'User Not Found'))
   }
    res.status(200).send({data: users});
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
     if(!updatedUser) {
      return  next(createError(404, 'User Not Found'))
     }
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
    if(!updatedUser) {
      return  next(createError(404, 'User Not Found'))
     }
    updatedUser.password = undefined;
    res.status(200).send({data:updatedUser});
  } catch (error) {
    next(error)
  }
}


module.exports.deleteUser = async (req, res, next) =>{
  try {
    const {params:{userId}} = req;
     const user = await User.findByPk(userId)
     if(!user) {
      return  next(createError(404, 'User Not Found'))
     }
    await  user.destroy()
    res.status(200).send(user);
  } catch (error) {
    next(error)
  }
}

