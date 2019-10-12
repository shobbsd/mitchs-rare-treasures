const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  seeds: {
    directory: './db/seeds'
  }
};

const envConfig = {
  development: {
    connection: {
      database: 'mitchs_rare_treasures'
    }
  },
  test: {
    connection: {
      database: 'mitchs_rare_treasures_test'
    }
  }
};

module.exports = { ...baseConfig, ...envConfig[ENV] };
