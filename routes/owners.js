const ownersRouter = require('express').Router();
const { getOwners } = require('../controllers/owners');

ownersRouter.route('/').get(getOwners);

module.exports = ownersRouter;
