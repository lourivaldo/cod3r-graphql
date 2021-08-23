const { users, nextId } = require('../data/db')

function userIndex(filter) {
    if (!filter) return -1
    const { id, email } = filter
    if (id) {
        return users.findIndex(u => u.id === id)
    } else if (id) {
        return users.findIndex(u => u.email === email)
    }
    return -1
}

module.exports = {
    createUser(_, { data: { name, email, age } }) {
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
    removeUser(_, { filter }) {
        const index = userIndex(filter)
        if (index < 0) return null
        const removedUsers = users.splice(index, 1)
        return removedUsers ? removedUsers[0] : null
    },
    updateUser(_, { filter, data }) {
        const index = userIndex(filter)
        if (index < 0) return null
        const user = {
            ...users[index],
            ...data
        }
        users.splice(index, 1, user)
        return user
    }
}
