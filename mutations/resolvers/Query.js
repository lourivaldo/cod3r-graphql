const { users, roles } = require('../data/db')

module.exports = {
    users() {
        return users;
    },
    user(_, { id }) {
        return users.find(user => user.id === id);
    },
    roles() {
        return roles;
    },
    role(_, { id }) {
        return roles.find(role => role.id === id);
    },
}
