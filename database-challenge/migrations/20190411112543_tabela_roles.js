
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', table => {
      table.increments('id').primary()
      table.string('nome').notNull().unique()
      table.string('rotulo').notNull()
  }).then(function () {
      return knex('roles').insert([
          { nome: 'comum', rotulo: 'Comum' },
          { nome: 'admin', rotulo: 'Administrador' },
          { nome: 'master', rotulo: 'Master' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles')
};
