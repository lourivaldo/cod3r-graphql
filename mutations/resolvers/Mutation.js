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
    },
    removeUser(_, { id }) {
        const index = users.findIndex(u => u.id === id)
        if (index < 0) return null
        const removedUsers = users.splice(index, 1)
        return removedUsers ? removedUsers[0] : null
    },
    updateUser(_, { id, name, email, age }) {
        const index = users.findIndex(u => u.id === id)
        if (index < 0) return null
        const user = {
            ...users[index],
            name,
            email,
            age
        }
        users.splice(index, 1, user)
        return user
    }
}
