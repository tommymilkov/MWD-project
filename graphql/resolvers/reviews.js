const { UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Book = require('../../models/Book');

module.exports = {
    Mutation: {
        createReview: async (_, { bookId, body }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === '') {
                throw new Error('Empty review', {
                    errors: {
                        body: 'Review body must not be empty'
                    }
                })
            }
            const book = await Book.findById(bookId);
            
            if(book) {
                book.reviews.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await book.save();
                return book;
            } else throw new UserInputError('Book not found');
        },
        async deleteReview(_, { bookId, reviewId }, context) {
            const { username } = checkAuth(context);
            
            const book = await Book.findById(bookId);
            
            if(book) {
                const reviewIndex = book.reviews.findIndex(r => r.id === reviewId);
                
                if(book.reviews[reviewIndex].username === username) {
                    book.reviews.splice(reviewIndex, 1);
                    await book.save();
                    return book;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } else {
                throw new UserInputError('Book not found');
            }
        },
        async likeReview(_, { bookId, reviewId }, context) { 
            const { username } = checkAuth(context);
            
            const book = await Book.findById(bookId);
            
            if(book) {
                if(book.reviews.find(review => review.id === reviewId)) {
                    if(book.reviews.find(review => review.likes.find(like => like.username === username))) {
                        // Review already liked, unlike it
                        book.reviews.find(review => review.id === reviewId).likes = book.reviews.find(review => review.id === reviewId).likes.filter(like => like.username !== username);
                    } else {
                        // Not liked, like review
                        book.reviews.find(review => review.id === reviewId).likes.push({
                            username,
                            createdAt: new Date().toISOString()
                        })
                    }
                    
                    await book.save();
                    return book;
                } else throw new UserInputError('Review not found');
            } else throw new UserInputError('Book not found');
        },
        async dislikeReview(_, { bookId, reviewId }, context) { 
            const { username } = checkAuth(context);
            
            const book = await Book.findById(bookId);
            
            if(book) {
                if(book.reviews.find(review => review.id === reviewId)) {
                    if(book.reviews.find(review => review.id === reviewId).likes.find(like => like.username === username)) {
                        // Review already liked, unlike it
                        book.reviews.find(review => review.id === reviewId).likes = book.reviews.find(review => review.id === reviewId).likes.filter(like => like.username !== username);
                    } else {
                        // Not liked, like review
                        book.reviews.find(review => review.id === reviewId).likes.push({
                            username,
                            createdAt: new Date().toISOString()
                        })
                    }
                    
                    await book.save();
                    return book;
                } else throw new UserInputError('Review not found');
            } else throw new UserInputError('Book not found');
        }
    }
};