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
    .select('owners.*')
    .orderBy(column, order)
    .modify(queryChain => {
      const { max_age, min_age, exact_age, forename, surname } = query;
      if (max_age) queryChain.where('owners.age', '<', max_age);
      if (min_age) queryChain.where('owners.age', '>', min_age);
      if (exact_age) queryChain.where('owners.age', '=', exact_age);
      if (forename) queryChain.where('forename', '=', forename);
      if (surname) queryChain.where('surname', '=', surname);
    })
    .join('shops', 'owners.owner_id', 'shops.owner_id')
    .groupBy('owners.owner_id')
    .count({ shop_count: 'shops.shop_name' })
    .join('treasures', 'shops.shop_id', 'treasures.shop_id')
    .sum({ stock_value: 'treasures.cost_at_auction' })
    .limit(limit)
    .offset(offset);
};
