const { fetchOwners } = require('../models/owners');

exports.getOwners = (req, res, next) => {
  const { sort_by, order, p, limit, ...query } = req.query;
  const checkResult = checkOrderBy(req.query);
  const acceptableQueries = [
    'max_age',
    'min_age',
    'exact_age',
    'forename',
    'surname'
  ];
  const queries = Object.keys(query);

  // checks the queries are one of the allowed ones
  if (queries.length) {
    const queryIsValid = queries.every(query =>
      acceptableQueries.includes(query)
    );
    if (!queryIsValid) return next({ status: 400, msg: 'query not allowed' });
  }

  // checks  the order and order direction are the allowed ones
  if (checkResult !== true) return next(checkResult);

  fetchOwners(sort_by, order, query, limit, p)
    .then(owners => {
      res.status(200).json({ owners });
    })
    .catch(next);
};

function checkOrderBy({ order, sort_by }) {
  if (order && !['asc', 'desc'].includes(order))
    return { status: 400, msg: 'order must be "asc" or "desc"' };

  if (sort_by && !['surname', 'forename', 'age'].includes(sort_by))
    return {
      status: 400,
      msg: 'sort_by must be "surname", "forename" or "age"'
    };

  return true;
}
