const { roles } = require('../data/db')

module.exports = {
    salary(user) {
        return user.salary_brute
    },
    role(user) {
        return roles.find(role => role.id === user.role_id);
    },
}
