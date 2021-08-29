const db = require('../config/db')

// const newRole = {
//     name: 'creator',
//     label: 'Creator'
// }
//
// db('roles')
//     .insert(newRole)
//     .then(res => console.log(res))
//     .catch(error => console.log(error.sqlMessage))
//     .finally(() => db.destroy())

const newRole = {
    name: 'root' + Math.random(),
    label: 'Root'
}

db.insert(newRole)
    .into('roles')
    .then(res => console.log(res))
    .catch(error => console.log(error.sqlMessage))
    .finally(() => db.destroy())
