const {gql} = require('apollo-server');

module.exports = gql`

    type Book {
        id: ID!
        title: String!
        author: String!
        createdAt: String!
        username: String!
        publicationYear: String!
        genre: String!
        body: String!
        reviews: [Review]!
        likes: [Like]!
    }

    type Review {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getBooks: [Book]
        getBook (bookId: ID!): Book
    }


    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createBook(title: String!, author: String!, publicationYear: Int!, genre: String!, body: String!): Book!
        deleteBook(bookId: ID!): String!
        createReview(bookId: String!, body: String!): Book!
        deleteReview(bookId: ID!, reviewId: ID!): Book!
        likeReview(bookId: ID!): Book!
        dislikeReview(bookId: ID!): Book!
    }

`;
