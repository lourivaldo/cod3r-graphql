const db = require('../../config/db')
const { role: getRole } = require('../Query/role')
const { user: getUser } = require('../Query/user')

module.exports = {
    async createUser(_, { data }) {
        try {
            const roleIds = []
            if (data.roles) {
                for (const roleFilter of data.roles) {
                    const role = await getRole(_, { filter: { ...roleFilter }  })
                    if (role) roleIds.push(role.id)
                }
            }
            const { name, email, password } = data
            const [id] = await db
                .into('users')
                .insert({ name, email, password })

            const roleValues = roleIds.map(roleId => ({ role_id: roleId, user_id: id }))
            await db
                .insert(roleValues)
                .into('roles_users')

            return db
                .into('users')
                .where({ id })
                .first()
        } catch (err) {
            throw new Error(err)
        }
    },
    async removeUser(_, { filter }) {
        try {
            const user = await getUser(_, { filter })
            if (user) {
                const { id } = user
                await db
                    .into('roles_users')
                    .where({ user_id: id })
                    .delete()

                await db
                    .into('users')
                    .where({ id })
                    .delete()

                return user
            }
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    },
    async updateUser(_, { filter, data }) {
        try {
            const user = await getUser(_, { filter })
            if (user) {
                const { id } = user
                if (data.roles) {
                    await db
                        .into('roles_users')
                        .where({ user_id: id })
                        .delete()

                    for (const roleFilter of data.roles) {
                        const role = await getRole(_, { filter: roleFilter })
                        if (role) {
                            await db
                                .insert({ role_id: role.id, user_id: id })
                                .into('roles_users')
                        }
                    }
                }

                delete data.roles
                await db
                    .into('users')
                    .where({ id })
                    .update(data)

                return { ...user, ...data }
            }
            return null
        } catch (err) {
            throw new Error(err)
        }
    }
}
