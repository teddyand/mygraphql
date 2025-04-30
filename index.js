const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`;

const resolvers = {
    Query: {
        totalPhotos: () => 42
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
    console.log(`GraphQL service running on ${url}`);
});	