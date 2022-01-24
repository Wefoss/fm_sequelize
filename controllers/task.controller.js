const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const task = await Task.create({ ...body, userId: id });
    res.status(201).send(task);
  } catch (error) {
    next(error)
  }
};
