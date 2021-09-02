const db = require('../../config/db')

module.exports = {
    async users() {
        return db
            .select('id', 'name', 'email', 'password')
            .into('users')
    },
    async user(_, { filter }) {
        if (!filter) return null
        const where = filter.id ? { id: filter.id } : { email: filter.email }
        return db
            .select('id', 'name', 'email', 'password')
            .into('users')
            .where(where)
            .first()
    },
}
