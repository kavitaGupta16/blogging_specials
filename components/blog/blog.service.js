const blogModel = require("./blog.model")
const userModel = require("../user/user.model")

const getAllBlog = async() => {
    try {
        const blogs = await blogModel.find({})
        return {code: 200, message: JSON.stringify(blogs)}
    } catch (err) {}
}

const myBlog = async(owner) => {
    try {
        const blogs = await blogModel.find({ owner })
        return {code: 200, message: JSON.stringify(blogs)}
    } catch (err) {}
}

const getBlog = async(id) => {
    try {
        const blogs = await blogModel.findById(id)
        let comments = []
        await Promise.all(
            blogs.comments.map(async(comment) => { 
                const userName = await userModel.findById(comment.by, {_id: 0, userName: 1})
                comment.by = userName.userName
                comments.push(comment)
            })
        )
        blogs.comments = comments
        return {code: 200, message: JSON.stringify(blogs)}
    } catch (err) {
        console.error(err)
    }
}

const createBlog = async(by, title, body, summary) => {
    try {
        await blogModel.create({
            owner: by,
            title,
            summary,
            body
        })
        return { code: 201, message: "Blog created" }
    } catch (err) { }
}

const updateBlog = async(userId, postId, title, body, summary) => {
    try {
        await blogModel.findByIdAndUpdate(postId,
            {
                owner: userId,
                title,
                summary,
                body
            }
        )
        return { code: 200, message: "Blog updated" }
    } catch (err) { }
}

const deleteBlog = async(id) => {
    try {
        await blogModel.findByIdAndDelete(id)
        return({code: 200, message: "Deleted"})
    } catch (err) {
        console.log(err)
    }
}
const addComment = async(userId, postId, comment) => {
    const commentObj = {
        comment,
        by: userId
    }
    try {
        await blogModel.findByIdAndUpdate(postId,
            {$push: { comments: commentObj }})
            return({code: 200, message: "Added comment"})
    } catch (err) { }
}

module.exports = {
    getAllBlog,
    myBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment
}