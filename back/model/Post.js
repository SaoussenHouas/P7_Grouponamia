const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    imageUrl: {
        type: String, 
        required: true,
    },
    likes: {
        type: Number
    },
    usersLiked: {
        type: [String]
    }
})

module.exports = mongoose.model('Post', postSchema)