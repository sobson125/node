/* eslint-disable max-len */
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');

const userRouter = new express.Router();
const upload = multer({
  limits: {
    fileSize: 10000000,

  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return callback(new Error('please upload image with jpg extension'));
    }
    callback(null, true);
  },
});

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

userRouter.post('/users/me/avatars', auth, upload.single('avatar'), async (req, res) => {
  const img = req.file.buffer;
  req.user.avatar = img;
  await req.user.save();
  res.status(200).send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
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

userRouter.get('/users/:id/avatars', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({_id: _id});

    if (!user || !user.avatar) {
      throw new Error('something went wrong');
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.send(error.message);
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

userRouter.delete('/users/me/avatars', auth, async (req, res) => {
  req.user.avatar = null;
  await req.user.save();
  res.send();
});

module.exports = userRouter;
