const db = require('../../config/db')

module.exports = {
    async users(role) {
        return db
            .select('id', 'name', 'email', 'password')
            .into('users')
            .join('roles_users', 'roles_users.user_id', 'users.id')
            .where('roles_users.role_id', '=', role.id)
    }
}
