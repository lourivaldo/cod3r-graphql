const db = require('../config/db')
const { getLoggedUser } = require('../resolvers/shared/user')

const sql = `
    select u.*
    from users u,
        roles_users ru,
        roles r
    where
        ru.user_id = u.id and
        ru.role_id = r.id and
        u.active = 1 and
        r.name = :roleName
    limit 1
`

const getUser = async roleName => {
    const res = await db.raw(sql, { roleName })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const user = await getUser('admin');
    if (user) {
        const { token } = await getLoggedUser(user);
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}
