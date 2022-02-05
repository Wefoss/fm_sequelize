const {Task, User} = require('../models');
const createError = require('http-error');

module.exports.createTask = async(req, res, next)=>{
  try {
    const {body, userInstance} = req;
    console.log(userInstance)
    const task = await userInstance.createTask(body);
    if(!task) {
      return next(createError(400, 'Bad Request'))
    }
    res.status(201).send({data: task});
  } catch (error) {
    next(error)
  }
}

module.exports.getUserTasks = async(req, res, next)=>{
  try {
    const {userInstance} = req;
    const tasks = await userInstance.getTasks();
    if(!tasks) {
      return next(createError(404, 'Task Not Found'))
    }
    res.status(200).send({data: tasks});
  } catch (error) {
    next(error)
  }
}

module.exports.deleteTask = async (req, res, next) =>{
  try {
    const {params:{taskId}} = req;
    const task = await Task.findByPk(taskId)
    if(!task) {
      return next(createError(404, 'Task Not Found'))
    } 
    await task.destroy()
          res.status(200).send(task);
  } catch (error) {
    next(error)
  }
}


module.exports.getAllTasks = async (req, res, next) =>{
  try {
    const {pagination} = req
       const tasks = await Task.findAll({
        ...pagination
       })
       if(!tasks) {
        return next(createError(400, 'Bad Request')) 
       }
        res.status(200).send(tasks);
  } catch (error) {
    next(error)
  }
}

module.exports.updateTask = async (req, res, next) =>{
  try {
    const {params:{taskId}, body} = req
       const [rows, [task]] = await Task.update(body, {
         where: {id: taskId},
         returning: true
       })
       if(!task) {
         return next(createError(400, 'Bad Request')) 
       }
        res.status(200).send({data: task});
  } catch (error) {
    next(error)
  }
}

module.exports.deleteUserTask = async (req, res, next) =>{
  try {
    const {params:{taskId, userId}} = req
    const user = await User.findByPk(userId)
    const task = await Task.findByPk(taskId)
    await user.destroy(taskId)
       if(!user && !task) {
         return next(createError(400, 'Bad Request')) 
       }
        res.status(200).send(task);
  } catch (error) {
    next(error)
  }
}