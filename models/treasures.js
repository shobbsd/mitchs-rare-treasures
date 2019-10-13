const knex = require('../db/connection');

exports.fetchAllTreasure = (
  column = 'cost_at_auction',
  order = 'desc',
  limit = 25,
  p = 1
) => {
  const offset = (p - 1) * limit;
  return knex('treasures')
    .select(
      'treasures.treasure_id',
      'treasures.treasure_name',
      'treasures.colour',
      'treasures.age',
      'treasures.cost_at_auction',
      'shops.shop_name'
    )
    .leftJoin('shops', 'treasures.shop_id', 'shops.shop_id')
    .orderBy(column, order)
    .limit(limit)
    .offset(offset);
};

exports.addTreasure = treasure => {
  return knex('treasures')
    .insert(treasure, ['*'])
    .then(([treasure]) => {
      return treasure;
    });
};

exports.updateTreasure = (treasure_id, cost_at_auction) => {
  return knex('treasures')
    .update({ cost_at_auction }, ['*'])
    .where({ treasure_id })
    .then(([treasure]) => {
      if (!treasure)
        return Promise.reject({
          status: 404,
          msg: `There is no treasure with id "${treasure_id}"`
        });
      return treasure;
    });
};

exports.fetchTreasureById = treasure_id => {
  return knex('treasures')
    .first('*')
    .where({ treasure_id })
    .then(treasure => {
      if (!treasure)
        return Promise.reject({
          status: 404,
          msg: `There is no treasure with id "${treasure_id}"`
        });
      return treasure;
    });
};

exports.removeTreasure = treasure_id => {
  return knex('treasures')
    .del()
    .where({ treasure_id })
    .then(delCount => {
      if (!delCount)
        return Promise.reject({
          status: 404,
          msg: `There is no treasure with id "${treasure_id}"`
        });
      // else return true
    });
};
