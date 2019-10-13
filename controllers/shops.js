const { fetchShops } = require('../models/shops');

exports.getShops = (req, res, next) => {
  const { sort_by, order, p, limit } = req.query;
  const acceptableSorts = ['shop_name', 'owner', 'stock_value'];

  if (sort_by && !acceptableSorts.includes(sort_by))
    return next({
      status: 400,
      msg: 'sort_by mut be either shop_name, owner or stock_value'
    });

  if (order && !['asc', 'desc'].includes(order))
    return next({
      status: 400,
      msg: 'order mut be either asc or desc'
    });

  if (p && isNaN(+p))
    return next({
      status: 400,
      msg: 'p mut be a number'
    });

  fetchShops(sort_by, order, limit, p).then(shops => {
    res.status(200).json({ shops });
  });
};
