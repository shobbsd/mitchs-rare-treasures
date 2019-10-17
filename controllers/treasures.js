const {
  fetchAllTreasure,
  addTreasure,
  updateTreasure,
  fetchTreasureById,
  removeTreasure
} = require('../models/treasures');
const { checkSortBys } = require('./utils');

exports.getAllTreasures = (req, res, next) => {
  const { sort_by, order, p, limit, ...query } = req.query;
  const acceptableSorts = [
    'treasure_name',
    'age',
    'cost_at_auction',
    'treasure_id'
  ];
  const acceptableQueries = [
    'max_age',
    'min_age',
    'max_price',
    'min_price',
    'colour'
  ];

  if (checkSortBys(req.query, acceptableSorts, next)) {
    fetchAllTreasure(sort_by, order, p, limit, query)
      .then(treasures => {
        res.status(200).json({ treasures });
      })
      .catch(next);
  }
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
