const express = require('express');
const apiRouter = require('./routes/api');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handle500Errors
} = require('./errors/');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
