const {
  fetchAllTreasure,
  addTreasure,
  updateTreasure,
  fetchTreasureById,
  removeTreasure
} = require('../models/treasures');

exports.getAllTreasures = (req, res, next) => {
  const { sort_by, order } = req.query;
  if (order && !['asc', 'desc'].includes(order)) {
    return next({ status: 400, msg: 'order must be "asc" or "desc"' });
  }
  fetchAllTreasure(sort_by, order)
    .then(treasures => {
      res.status(200).json({ treasures });
    })
    .catch(next);
};

exports.postTreasure = (req, res, next) => {
  const treasure = { ...req.body };
  addTreasure(treasure)
    .then(treasure => {
      res.status(201).json({ treasure });
    })
    .catch(next);
};

exports.patchTreasure = (req, res, next) => {
  const { treasure_id } = req.params;
  const { cost_at_auction } = req.body;
  if (cost_at_auction) {
    updateTreasure(treasure_id, cost_at_auction)
      .then(treasure => {
        res.status(200).json({ treasure });
      })
      .catch(next);
  } else {
    fetchTreasureById(treasure_id).then(treasure => {
      res.status(200).json({ treasure });
    });
  }
};

exports.deleteTreasure = (req, res, next) => {
  const { treasure_id } = req.params;
  removeTreasure(treasure_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
