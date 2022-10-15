const { default: mongoose } = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    by: {
        type: String
    },
    to: {
        type: String
    }
}, {
    timestamps: true
})

const blogSchema = new mongoose.Schema({
    owner: {
        type: String
    },
    title: {
        type: String
    },
    headerImage: {
        type: String
    },
    body: {
        type: String
    },
    status: {
        type: String
    },
    comments: {
        type: [commentSchema]
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    collection: 'blogs',
    timestamps: true
})

module.exports = mongoose.model("Blog", blogSchema)
