exports.checkSortBys = (
  { sort_by, order, p, limit },
  acceptableSorts,
  next
) => {
  if (sort_by && !acceptableSorts.includes(sort_by)) {
    return next({
      status: 400,
      msg: `Acceptable sort_bys are: ${acceptableSorts.join(', ')}`
    });
  }

  if (order && !['asc', 'desc'].includes(order)) {
    return next({
      status: 400,
      msg: 'order mut be either asc or desc'
    });
  }

  if (p && isNaN(+p)) {
    return next({
      status: 400,
      msg: 'p mut be a number'
    });
  }

  if (limit && isNaN(+limit)) {
    return next({
      status: 400,
      msg: 'limit mut be a number'
    });
  }

  return true;
};

exports.checkQueries = (query, acceptableQueries, next) => {
  const queries = Object.keys(query);

  // checks the queries are one of the allowed ones
  if (queries.length) {
    const queryIsValid = queries.every(query =>
      acceptableQueries.includes(query)
    );
    if (!queryIsValid) return next({ status: 400, msg: 'query not allowed' });
  }
  return true;
};
