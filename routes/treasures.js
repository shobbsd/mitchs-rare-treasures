const treasuresRouter = require('express').Router();
const {
  getAllTreasures,
  postTreasure,
  patchTreasure,
  deleteTreasure
} = require('../controllers/treasures');

treasuresRouter
  .route('/')
  .get(getAllTreasures)
  .post(postTreasure);

treasuresRouter
  .route('/:treasure_id')
  .patch(patchTreasure)
  .delete(deleteTreasure);

module.exports = treasuresRouter;
