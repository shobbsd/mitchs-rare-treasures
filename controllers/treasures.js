const { fetchAllTreasure } = require('../models/treasures');

exports.getAllTreasures = (req, res, next) => {
  fetchAllTreasure().then(treasures => {
    res.status(200).json({ treasures });
  });
};
