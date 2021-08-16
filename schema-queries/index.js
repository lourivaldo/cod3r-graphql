const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date
    
    type Query {
        hello: String
        date: Date
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'Hello world'
        },
        date() {
            return new Date()
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
