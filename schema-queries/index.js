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
    
    type Query {
        hello: String
        date: Date
        loggedUser: User
    }
`

const resolvers = {
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
                name: 'Lourivaldo',
                email: 'lourivaldovasconcelos@gamil.com',
                age: 20,
                salary: 1234.56,
                vip: true
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
