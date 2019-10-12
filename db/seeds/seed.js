const { ownerData, shopData, treasureData } = require('../data');
const { formatData, createRef } = require('../utils');

exports.seed = function(knex, Promise) {
  return knex('owners')
    .insert(ownerData)
    .returning('*')
    .then(owners => {
      const ownerRef = createRef(owners, 'forename', 'owner_id');
      const formattedShops = formatData(
        shopData,
        ownerRef,
        'owner_id',
        'owner'
      );
      return knex('shops')
        .insert(formattedShops)
        .returning('*');
    })
    .then(shops => {
      const shopRef = createRef(shops, 'shop_name', 'shop_id');
      const formattedTreasures = formatData(
        treasureData,
        shopRef,
        'shop_id',
        'shop'
      );
      return knex('treasures').insert(formattedTreasures);
    })
    .catch(console.log);
};
