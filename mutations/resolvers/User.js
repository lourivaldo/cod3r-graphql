const { roles } = require('../data/db')

module.exports = {
    role(user) {
        return roles.find(role => role.id === user.role_id);
    },
}
