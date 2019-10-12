const apiRouter = require('express').Router();
const treasuresRouter = require('./treasures');

apiRouter.use('/treasures', treasuresRouter);

module.exports = apiRouter;
