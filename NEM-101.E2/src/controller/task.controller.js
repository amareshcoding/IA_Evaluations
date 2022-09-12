const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const Task = require('../models/task.model');
const taskRoute = express.Router();

taskRoute.get('/', authMiddleware, async (req, res) => {
  try {
    const [id, mail, pass] = req.headers.token.trim().split(':');

    const page = req.query.page || 1;
    const size = req.query.size || 5;

    const task = await Task.find({ author: id }).skip((page-1)*size).limit(size).lean().exec();
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
    const [id, mail, pass] = req.headers.token.trim().split(':');
    const newTask = {
      ...req.body,
      author: id,
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
