const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'Hello world'
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
