const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date
    
    type User {
        id: ID!
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
        }
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
