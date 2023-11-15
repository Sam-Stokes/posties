import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['queued', 'posted'],
        default: 'queued',
    },
    // Add any other fields as necessary
})

const Post = mongoose.model('Post', postSchema)

export default Post
