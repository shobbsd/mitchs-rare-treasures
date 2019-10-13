const apiRouter = require('express').Router();
const treasuresRouter = require('./treasures');
const ownersRouter = require('./owners');
const shopsRouter = require('./shops');

apiRouter.use('/treasures', treasuresRouter);
apiRouter.use('/owners', ownersRouter);
apiRouter.use('/shops', shopsRouter);

module.exports = apiRouter;
