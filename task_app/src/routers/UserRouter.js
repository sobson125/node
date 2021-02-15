const express = require('express');
const User = require('../models/User');

const router = new express.Router();


// USERS ENDPOINTS
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const newUser = req.body;
  try {
    // eslint-disable-next-line max-len
    const user = await User.findByIdAndUpdate(_id, newUser, {new: true, runValidators: true});
    if (!user) {
      return res.status(404).send();
    } else {
      res.status(201).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      throw new Error('No user found');
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = router;
