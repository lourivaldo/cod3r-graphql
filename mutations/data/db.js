let id = 1
function nextId () {
    return id++
}

const roles = [
    {
        id: 1,
        name: 'Comum',
    },
    {
        id: 2,
        name: 'Administrador',
    }
]

const users = [
    {
        id: nextId(),
        name: 'Lourivaldo',
        email: 'lourivaldo@gmail.com',
        age: 30,
        role_id: 1,
        status: 'ACTIVE',
    },
    {
        id: nextId(),
        name: 'Rafael',
        email: 'rafael@gmail.com',
        age: 31,
        role_id: 2,
        status: 'INACTIVE',
    },
    {
        id: nextId(),
        name: 'Daniela',
        email: 'daniela@gmail.com',
        age: 24,
        role_id: 2,
        status: 'BLOCKED',
    },
]

module.exports = { users, roles, nextId }
