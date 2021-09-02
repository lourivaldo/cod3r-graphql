const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    await require('./simulateUserLogged')(req) // dev

    const auth = req.headers.authorization
    const token = auth && auth.substr(7)

    let user = null
    let admin = false

    if (token) {
        try {
            let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET)
            // console.log('tokenContent', tokenContent)
            if (new Date(tokenContent.exp * 1000) > new Date()) {
                user = tokenContent
            }
        } catch (err) {
            // invalid
        }
    }

    if (user && user.roles) {
        admin = user.roles.includes('admin')
    }

    const unauthorizedError = new Error('unauthorized')

    return {
        user,
        admin,
        validateUser() {
            if (!user) throw unauthorizedError
        },
        validateAdminUser() {
            if (!admin) throw unauthorizedError
        }
    }
}
