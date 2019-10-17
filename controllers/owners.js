const { fetchOwners } = require('../models/owners');
const { checkSortBys, checkQueries } = require('./utils');

exports.getOwners = (req, res, next) => {
  const { sort_by, order, p, limit, ...query } = req.query;
  const acceptableSorts = ['surname', 'forename', 'age'];
  const acceptableQueries = [
    'max_age',
    'min_age',
    'exact_age',
    'forename',
    'surname'
  ];

  if (
    checkSortBys(req.query, acceptableSorts, next) &&
    checkQueries(query, acceptableQueries, next)
  ) {
    fetchOwners(sort_by, order, query, limit, p)
      .then(owners => {
        res.status(200).json({ owners });
      })
      .catch(next);
  }
};
