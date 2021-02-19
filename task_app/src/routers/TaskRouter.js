/* eslint-disable max-len */
const express = require('express');
const Task = require('../models/Task');

const router = new express.Router();

// TASKS ENDPOINTS
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(400).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const newTask = req.body;
  try {
    const task = await Task.findById(_id);
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

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
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
