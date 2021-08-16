const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String
        date: String
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'Hello world'
        },
        date() {
            return (new Date()).toDateString()
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
