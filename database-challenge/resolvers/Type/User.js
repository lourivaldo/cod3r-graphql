const db = require('../../config/db')

module.exports = {
    async roles(user) {
        return db
            .select('id', 'name', 'label')
            .into('roles')
            .join('roles_users', 'roles_users.role_id', 'roles.id')
            .where('roles_users.user_id', '=', user.id)
    }
}
