require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'Abbey2433',
    database: 'hellobooks',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DB',
    dialect: 'postgres'
  },

  production: {
    use_env_constiable: 'DATABASE_URL'
  }
};

