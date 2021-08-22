const { ApolloServer, gql } = require('apollo-server')

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
        id: 1,
        name: 'Lourivaldo',
        email: 'lourivaldo@gmail.com',
        age: 30,
    },
    {
        id: 2,
        name: 'Rafael',
        email: 'rafael@gmail.com',
        age: 31,
    },
    {
        id: 3,
        name: 'Daniela',
        email: 'daniela@gmail.com',
        age: 24,
    },
]

const typeDefs = gql`
    scalar Date

    type Role {
        id: Int!
        name: String!
    }
    
    type User {
        id: Int!
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
    }

    type Product {
        name: String!
        price: Float!
        discount: Float
        priceWithDiscount: Float
    }
    
    type Query {
        hello: String
        date: Date
        loggedUser: User
        mainProduct: Product
        lotteryNumbers: [Int!]!
        users: [User]
        user(id: Int): User
        roles: [Role]
        role(id: Int): Role
    }
`

const resolvers = {
    User: {
      salary(user) {
          return user.salary_brute
      },
    },
    Product: {
      priceWithDiscount(product) {
          if (!product.discount) return product.price
          return product.price * (1 - product.discount)
      },
    },
    Query: {
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
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(({ url }) => {
        console.log(`Running in ${url}`)
    })
