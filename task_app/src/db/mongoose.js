/* eslint-disable max-len */
const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(uris = connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

