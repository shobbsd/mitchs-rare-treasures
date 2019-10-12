const knex = require('../db/connection');

exports.fetchAllTreasure = () => {
  return knex('treasures')
    .select(
      'treasures.treasure_id',
      'treasures.treasure_name',
      'treasures.colour',
      'treasures.age',
      'treasures.cost_at_auction',
      'shops.shop_name'
    )
    .leftJoin('shops', 'treasures.shop_id', 'shops.shop_id');
};
