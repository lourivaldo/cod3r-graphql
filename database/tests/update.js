const db = require('../config/db')

const newUser = {
    name: 'Loro 1',
    email: 'loro@gmail.com',
    password: '123456',
}

async function updateOrCreate() {
    const { count } = await db('users').count('* as count').first()

    if (count === 0) {
        const res = await db('users')
            .insert(newUser)
        console.log(res);
        return res;
    }

    const { id } = await db('users')
        .select('id')
        .limit(1)
        .first();

    const res = await db('users')
        .where({ id })
        .update({
            name: 'Lourivaldo',
            email: 'lourivaldo@gmail.com',
        });
    console.log(res)
    return res;
}

updateOrCreate()
