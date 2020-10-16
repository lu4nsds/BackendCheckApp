// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'tccGesio',
      user:'postgres',
      password: '010203'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
