const { users, roles } = require('../data/db')

module.exports = {
    hello() {
        return 'Hello world'
    },
    date() {
        return new Date()
    },
    loggedUser() {
        return {
            id: 1,
            name: 'Lourivaldo Vasconcelos',
            email: 'lourivaldovasconcelos@gamil.com',
            age: 20,
            salary_brute: 1234.56,
            vip: true
        }
    },
    mainProduct() {
        return {
            name: 'Macbook',
            price: 12000,
            discount: 0.1,
        }
    },
    lotteryNumbers() {
        const ascSort = (a, b) => a - b
        return Array(6)
            .fill(0)
            .map(() => parseInt(Math.random() * 60 + 1))
            .sort(ascSort)
    },
    users() {
        return users;
    },
    user(_, { id }) {
        return users.find(user => user.id === id);
    },
    roles() {
        return roles;
    },
    role(_, { id }) {
        return roles.find(role => role.id === id);
    },
}
