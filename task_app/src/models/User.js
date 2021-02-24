/* eslint-disable max-len */
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./Task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email\'s not valid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value) || value.toLowerCase().includes('password')) {
        throw new Error('Your password is invalid');
      }
    },
  },
  age: {
    default: 0,
    type: Number,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  avatar: {
    type: Buffer,
  },
}, {
  timestamps: true,
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'createdBy',
});

userSchema.statics.findByCredentials = async (email, password)=>{
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcryptjs.compare(password, user['password']);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

userSchema.methods.generateJWT = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'secretsecret', {expiresIn: '10min'});
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userDTO = user.toObject();
  delete userDTO.password;
  delete userDTO.tokens;
  return userDTO;
};

// HASHING PASSWORD
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user['password'] = await bcryptjs.hash(user['password'], 8);
  }
  console.log('b4 save');
  next();
});

userSchema.pre('remove', async function(next) {
  const user = this;
  Task.deleteMany({createdBy: user._id});
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
