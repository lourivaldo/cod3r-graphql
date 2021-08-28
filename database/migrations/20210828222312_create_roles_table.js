
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('label').notNull()
    }).then(() => {
        return knex('roles').insert([
            { name: 'default', label: 'Padrão' },
            { name: 'admin', label: 'Administrador' },
            { name: 'master', label: 'Master' },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles')
};
