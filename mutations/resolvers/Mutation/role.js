const { roles, nextId } = require('../../data/db')

function roleIndex(filter) {
    if (!filter) return -1
    const { id, name } = filter
    if (id) {
        return roles.findIndex(u => u.id === id)
    } else if (id) {
        return roles.findIndex(u => u.name === name)
    }
    return -1
}

module.exports = {
    createRole(_, { data: { name } }) {
        const nameExists = roles.some(u => u.name === name)
        if (nameExists) {
            throw new Error('name exists')
        }
        const role = {
            id: nextId(),
            name,
        }
        roles.push(role)
        return role
    },
    removeRole(_, { filter }) {
        const index = roleIndex(filter)
        if (index < 0) return null
        const removedRoles = roles.splice(index, 1)
        return removedRoles ? removedRoles[0] : null
    },
    updateRole(_, { filter, data }) {
        const index = roleIndex(filter)
        if (index < 0) return null
        const role = {
            ...roles[index],
            ...data
        }
        roles.splice(index, 1, role)
        return role
    }
}
