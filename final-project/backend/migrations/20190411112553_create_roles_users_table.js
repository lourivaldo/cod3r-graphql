
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles_users', table => {
        table.integer('user_id').unsigned()
        table.integer('role_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.foreign('role_id').references('roles.id')
        table.primary(['user_id', 'role_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles_users')
};
