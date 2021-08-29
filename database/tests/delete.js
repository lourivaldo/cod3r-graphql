const db = require('../config/db')

async function removeById() {
    const res = await db('users')
        .where({ id: 2 })
        .delete()
    console.log(res)
    await db.destroy()
}

async function removeAll() {
    const res = await db('users')
        .delete()
    console.log(res)
    await db.destroy()
}

// removeById()
removeAll()
