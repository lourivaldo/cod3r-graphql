// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    database: 'dbchallenge',
    user:     'admin',
    password: 'admin'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
