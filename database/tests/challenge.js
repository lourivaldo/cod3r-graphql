const db = require('../config/db')

async function saveUser(name, email, password) {
    let user = await db
        .into('users')
        .where({ email })
        .first()

    if (!user) {
        const [id] = await db
            .insert({ name, email, password })
            .into('users')
        user = await db
            .into('users')
            .where({ id })
            .first()
    }

    return user
}

async function saveRole(name, label) {
    let role = await db
        .into('roles')
        .where({ name })
        .first()

    if (!role) {
        const [id] = await db
            .insert({ name, label })
            .into('roles')
        role = await db
            .into('roles')
            .where({ id })
            .first()
    }

    return role
}

async function addRolesToUser(user, ...roles) {
    await db.into('roles_users')
        .where({ user_id: user.id })
        .delete()

    for (const role of roles) {
        await db
            .insert({ role_id: role.id, user_id: user.id })
            .into('roles_users')
    }
}

async function run() {
    const user = await saveUser('Lourivaldo', 'lourivaldo@mail.com', '1234')

    const roleRh = await saveRole('rh', 'RH')
    const roleFinancial = await saveRole('fin', 'Financeiro')

    console.log(user)
    console.log(roleRh)
    console.log(roleFinancial)

    await addRolesToUser(user, roleRh, roleFinancial)
}

run()
    .catch((err) => console.log(err.sqlMessage))
    .finally(() => db.destroy())
