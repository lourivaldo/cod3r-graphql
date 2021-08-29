const db = require('../../config/db')

module.exports = {
    async roles() {
        return db
            .select('id', 'name', 'label')
            .into('roles')
    },
    async role(_, { filter }) {
        const where = filter.id ? { id: filter.id } : { name: filter.name }
        return db
            .select('id', 'name', 'label')
            .into('roles')
            .where(where)
            .first()
    }
}
