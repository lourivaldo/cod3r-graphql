const { users, nextId } = require('../data/db')

module.exports = {
    createUser(_, { name, email, age }) {
        const emailExists = users.some(u => u.email === email)
        if (emailExists) {
            throw new Error('email exists')
        }
        const user = {
            id: nextId(),
            name,
            email,
            age,
            role_id: 1,
            status: 'ATIVO'
        }
        users.push(user)
        return user
    }
}
