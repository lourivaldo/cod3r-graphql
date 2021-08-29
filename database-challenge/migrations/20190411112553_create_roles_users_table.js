
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles_users', table => {
        table.integer('user_id').unsigned()
        table.integer('role_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.foreign('role_id').references('roles.id')
        table.primary(['user_id', 'role_id'])
    }).then(function () {
        return knex('roles_users').insert([
            { user_id: 1, role_id: 2 },
            { user_id: 1, role_id: 3 },
            { user_id: 2, role_id: 2 },
            { user_id: 3, role_id: 1 },
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles_users')
};
