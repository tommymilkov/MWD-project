const { ApolloServer }  = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5005 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    }) 

    
