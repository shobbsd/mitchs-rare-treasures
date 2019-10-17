const express = require('express');
const exphbs = require('express-handlebars');
const apiRouter = require('./routes/api');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handle500Errors
} = require('./errors/');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.render('home');
});
app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
