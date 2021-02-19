/* eslint-disable max-len */
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const token = jwt.sign({_id: user._id.toString()}, 'secretsecret');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
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


const User = mongoose.model('User', userSchema);

module.exports = User;
