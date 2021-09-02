const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { getLoggedUser } = require('../shared/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
            .where({ email: data.email })
            .first()

        if (!user) {
            throw new Error('Invalid user')
        }

        const isEqual = bcrypt.compareSync(data.password, user.password)

        if (!isEqual) {
            throw new Error('Invalid password')
        }

        return getLoggedUser(user)
    },
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
