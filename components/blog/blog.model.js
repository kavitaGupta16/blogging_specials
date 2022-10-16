const { default: mongoose } = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    by: {
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
    body: {
        type: String
    },
    summary: {
        type: String
    },
    comments: {
        type: [commentSchema]
    },
}, {
    collection: 'blogs',
    timestamps: true
})

module.exports = mongoose.model("Blog", blogSchema)
