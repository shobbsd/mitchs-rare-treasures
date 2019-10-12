const ENV = process.env.NODE_ENV || 'development';

const data = {
  test: require('./test-data'),
  development: require('./dev-data')
};

module.exports = data[ENV];
