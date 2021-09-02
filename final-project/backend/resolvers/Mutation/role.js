const db = require('../../config/db')

const { role: getRole } = require('../Query/role')

module.exports = {
    async createRole(_, {data}, ctx) {
        ctx && ctx.validateAdminUser()
        try {
            const { name, label } = data
            const [id] = await db
                .insert({ name, label })
                .into('roles')

            return db
                .into('roles')
                .where({id})
                .first()
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    },
    async removeRole(_, { filter }, ctx) {
        ctx && ctx.validateAdminUser()
        try {
            const role = await getRole(_, { filter })
            if (role) {
                const { id } = role
                await db
                    .into('roles_users')
                    .where({ role_id: id })
                    .delete()

                await db
                    .into('roles')
                    .where({ id })
                    .delete()

                return role
            }
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    },
    async updateRole(_, { filter, data }, ctx) {
        ctx && ctx.validateAdminUser()
        try {
            const role = await getRole(_, { filter })
            if (role) {
                const { id } = role
                await db
                    .into('roles')
                    .where({ id })
                    .update(data)

                return { ...role, ...data }
            }
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }
}
