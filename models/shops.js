const knex = require('../db/connection');

exports.fetchShops = (
  column = 'shop_name',
  order = 'asc',
  limit = 10,
  p = 1
) => {
  const offset = (p - 1) * limit;
  return knex('shops')
    .select('shops.shop_id', 'shop_name', 'forename AS shop_owner', 'slogan')
    .join('owners', 'shops.owner_id', 'owners.owner_id')
    .join('treasures', 'shops.shop_id', 'treasures.shop_id')
    .count({ stock_value: 'cost_at_auction' })
    .groupBy('shops.shop_id', 'forename', 'surname')
    .orderBy(column, order)
    .limit(limit)
    .offset(offset);
};
