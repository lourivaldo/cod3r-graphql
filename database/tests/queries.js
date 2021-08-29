const db = require('../config/db')

// db('roles')
//     .then(names => console.log(names))
//     .catch(error => console.log(error.sqlMessage))
//     .finally(() => db.destroy())

// db('roles')
//     .select('name', 'id')
//     .then(res => console.log(res))
//     .catch(error => console.log(error.sqlMessage))
//     .finally(() => db.destroy())

// db.select('name', 'id')
//     .from('roles')
//     .limit(4)
//     .offset(2)
//     .then(res => console.log(res))
//     .catch(error => console.log(error.sqlMessage))
//     .finally(() => db.destroy())

db('roles')
    // .where({ id: 2 })
    // .where('id', '=', 2)
    // .where('name', 'like', '%ad%')
    // .whereNot({ id: 2 })
    .whereIn('id', [1, 2])
    // .first()
    .then(res => console.log(res))
    .catch(error => console.log(error.sqlMessage))
    .finally(() => db.destroy())
