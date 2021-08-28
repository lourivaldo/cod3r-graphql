const { roles } = require('../../data/db')

module.exports = {
    roles() {
        return roles;
    },
    role(_, { id }) {
        return roles.find(role => role.id === id);
    },
}
