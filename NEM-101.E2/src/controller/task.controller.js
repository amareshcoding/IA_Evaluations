const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const Task = require('../models/task.model');
const taskRoute = express.Router();

// taskRoute.use(authMiddleware)

taskRoute.get('/', authMiddleware, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 5;

    const task = await Task.find({ author: req.user._id })
      .skip((page - 1) * size)
      .limit(size).populate({path:"aurhor", select:["name", "email", "pic"]});
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

taskRoute.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

taskRoute.post('/', authMiddleware, async (req, res) => {
  try {
    const newTask = {
      ...req.body,
      author: req.user._id,
    };
    const task = await Task.create(newTask);
    return res.status(201).send('task created successfully');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

taskRoute.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

taskRoute.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = taskRoute;
