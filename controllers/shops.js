const { fetchShops } = require('../models/shops');
const { checkSortBys } = require('./utils');

exports.getShops = (req, res, next) => {
  const { sort_by, order, p, limit } = req.query;
  const acceptableSorts = ['shop_name', 'owner', 'stock_value'];

  if (checkSortBys(req.query, acceptableSorts, next)) {
    fetchShops(sort_by, order, limit, p)
      .then(shops => {
        res.status(200).json({ shops });
      })
      .catch(next);
  }
};
