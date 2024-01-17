const { AuthenticationError } = require('apollo-server');

const Book = require('../../models/Book');
const checkAuth = require('../../util/check-auth');


module.exports = {
    Query: {
        async getBooks() {
            try {
                const books = await Book.find().sort({ createdAt: -1 });
                return books;
            } catch(err) {
                throw new Error(err);
            }
        },
        
        async getBook(_, { bookId }) {
            try {
                const book = await Book.findById(bookId);
                if(book) {
                    return book;
                } else {
                    throw new Error('Book not found');
                }
            } 
            catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createBook(_, { title, author, publicationYear, genre, body}, context) {
            const user = checkAuth(context);
            console.log(user);
            const newBook = new Book({
                title,
                author,
                publicationYear,
                genre,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                body
            });
            
            const book = await newBook.save();
            
            return book;
        },
        
        async deleteBook(_, { bookId }, context) {
            const user = checkAuth(context);
      
            try {
                const book = await Book.findById(bookId);
                if (user.username === book.username) {
                  await Book.deleteOne({_id: bookId});
                  return 'Book deleted successfully';
                } else {
                  throw new AuthenticationError('Action not allowed');
                }
              } catch(err) {
                throw new Error(err);
              }
        }
    }
 };
