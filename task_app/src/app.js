/* eslint-disable max-len */

// LIBRARIES
const express = require('express');
require('./db/mongoose');

// DEPENDENCIES
const userRouter = require('./routers/UserRouter');
const taskRouter = require('./routers/TaskRouter');
// UTILITY
const port = process.env.PORT || 3000;

// INIT
const app = express();
app.use(userRouter);
app.use(taskRouter);
app.use(express.json());


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

