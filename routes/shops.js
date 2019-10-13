const shopsRouter = require('express').Router();
const { getShops } = require('../controllers/shops');

shopsRouter.route('/').get(getShops);

module.exports = shopsRouter;
