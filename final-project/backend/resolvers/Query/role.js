const db = require('../../config/db')

module.exports = {
    async roles(parent, args, ctx) {
        ctx && ctx.validateAdminUser()
        return db
            .select('id', 'name', 'label')
            .into('roles')
    },
    async role(_, { filter }, ctx) {
        ctx && ctx.validateAdminUser()
        const where = filter.id ? { id: filter.id } : { name: filter.name }
        return db
            .select('id', 'name', 'label')
            .into('roles')
            .where(where)
            .first()
    }
}
