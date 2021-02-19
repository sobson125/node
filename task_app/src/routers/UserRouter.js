const express = require('express');
const User = require('../models/User');

const userRouter = new express.Router();


// USERS ENDPOINTS
userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    token = await user.generateJWT();
    res.status(201).send(user, token);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

userRouter.post('/users/login', async (req, res) => {
  const email = req.body['email'];
  const password = req.body['password'];
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateJWT();
    res.send({user, token});
  } catch (error) {
    res.status(400).send();
  }
});

userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

userRouter.get('/users/:id', async (req, res) => {
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

userRouter.put('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    // eslint-disable-next-line max-len
    // const user = await User.findByIdAndUpdate(_id, newUser, {new: true, runValidators: true});
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

userRouter.delete('/users/:id', async (req, res) => {
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
module.exports = userRouter;
