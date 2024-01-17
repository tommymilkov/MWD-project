const { model, Schema} = require('mongoose');

const bookSchema = new Schema({
    title: String,
    author: String,
    publicationYear: String,
    createdAt: String,
    genre: String,
    owner: String,
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
    
});

module.exports = model('Book', bookSchema);