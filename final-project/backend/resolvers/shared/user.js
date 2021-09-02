const jwt = require('jwt-simple')
const { roles: getRoles } = require('../Type/User')

module.exports = {
    async getLoggedUser(user) {
        const roles = await getRoles(user)
        const now = Math.floor(Date.now() / 1000)

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: roles.map(r => r.name),
            iat: now,
            exp: now + (3 * 24 * 60 * 60)
        }

        const authSecret = process.env.APP_AUTH_SECRET
        return {
            ...userData,
            token: jwt.encode(userData, authSecret)
        }
    },
}
