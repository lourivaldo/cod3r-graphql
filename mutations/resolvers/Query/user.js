const { users } = require('../../data/db')

module.exports = {
    users() {
        return users;
    },
    user(_, { id }) {
        return users.find(user => user.id === id);
    },
}
