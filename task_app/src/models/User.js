/* eslint-disable max-len */
const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User', {
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
});

module.exports = User;
