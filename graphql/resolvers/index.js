const booksResolvers = require('./books');
const usersResolvers = require('./users');
const reviewsResolvers = require('./reviews');

module.exports = {
    Query: {
        ...booksResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...booksResolvers.Mutation,
        ...reviewsResolvers.Mutation
    }
}