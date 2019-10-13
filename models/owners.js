const knex = require('../db/connection');

exports.fetchOwners = (
  column = 'forename',
  order = 'asc',
  query,
  limit = 10,
  page = 1
) => {
  const offset = (page - 1) * limit;
  return knex('owners')
    .select('*')
    .orderBy(column, order)
    .modify(queryChain => {
      const { max_age, min_age, exact_age, forename, surname } = query;
      if (max_age) queryChain.where('age', '<', max_age);
      if (min_age) queryChain.where('age', '>', min_age);
      if (exact_age) queryChain.where('age', '=', exact_age);
      if (forename) queryChain.where('forename', '=', forename);
      if (surname) queryChain.where('surname', '=', surname);
    })
    .limit(limit)
    .offset(offset);
};
