const ownersRouter = require('express').Router();
const { getOwners } = require('../controllers/owners');
console.log(getOwners);
ownersRouter.route('/').get(getOwners);

module.exports = ownersRouter;
