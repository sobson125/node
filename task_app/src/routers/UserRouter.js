const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const userRouter = new express.Router();


// USERS ENDPOINTS
userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    token = await user.generateJWT();
    res.status(201).send({user, token});
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


userRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

userRouter.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});


userRouter.get('/users/me', auth, async (req, res) => {
  await req.user.populate('tasks').execPopulate();
  console.log(req.user.tasks);
  res.send(req.user);
});

userRouter.get('/users', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});


userRouter.put('/users/me', auth, async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      req.user[key] = req.body[key];
    });

    await req.user.save();
    res.status(201).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

userRouter.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = userRouter;
