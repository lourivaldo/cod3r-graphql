
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', table => {
      table.increments('id').primary()
      table.string('name').notNull().unique()
      table.string('label').notNull()
  }).then(function () {
      return knex('roles').insert([
          { name: 'comum', label: 'Comum' },
          { name: 'admin', label: 'Administrador' },
          { name: 'master', label: 'Master' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles')
};
