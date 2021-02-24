/* eslint-disable max-len */
const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = new express.Router();

// TASKS ENDPOINTS
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    createdBy: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// params ? isCompleted -> true/false
// liomit, skip -> integer
// sortBy -> asc/desc
router.get('/tasks', auth, async (req, res) => {
  const isCompleted = req.query.completed;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  const sortBy = req.query.sortBy;
  const searchFor = {};
  const sortWith = {};

  if (isCompleted) {
    searchFor.isCompleted = isCompleted;
  }
  searchFor.createdBy = req.user._id;

  if (sortBy) {
    const arr = sortBy.split(':');
    sortWith[arr[0]] = arr[1] === 'desc' ? -1 : 1;
  }
  console.log(sortWith);
  try {
    const tasks = await Task.find(searchFor).limit(limit).skip(skip).sort(sortWith);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({
      _id,
      createdBy: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({_id, createdBy: req.user._id});
    if (!task) {
      throw new Error('Not found');
    }
    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({_id, createdBy: req.user._id});
    if (!task) {
      throw new Error('No user found');
    }
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
