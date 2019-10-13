const apiRouter = require('express').Router();
const treasuresRouter = require('./treasures');
const ownersRouter = require('./owners');

apiRouter.use('/treasures', treasuresRouter);
apiRouter.use('/owners', ownersRouter);

module.exports = apiRouter;
