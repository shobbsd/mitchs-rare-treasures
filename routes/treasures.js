const treasuresRouter = require('express').Router();
const { getAllTreasures } = require('../controllers/treasures');

treasuresRouter.route('/').get(getAllTreasures);

module.exports = treasuresRouter;
