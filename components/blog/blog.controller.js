const { JWT_SECRET } = require("../../config/hotKeys")
const service = require("./blog.service")

const getAllBlogs = async(req, res) => {
    const response = await service.getAllBlog()
    res.status(response.code).send(response.message)
}
const myBlogs = async(req, res) => {
    console.log("df")
    const response = await service.myBlog(req.params['id']) 
    res.status(response.code).send(response.message)

}
const getBlog = async(req, res) => {
    const response = await service.getBlog(req.params['id'])
    res.status(response.code).send(response.message)
}

const createBlog = async(req, res) => {
    const reqBody = req.body
    const userName = req.params['id']
    if (!userName || !reqBody.title || !reqBody.content || !reqBody.summary ) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.createBlog(userName, reqBody.title, reqBody.content, reqBody.summary)
    res.status(response.code).send(response.message)
}

const updateBlog = async(req, res) => {
    const userId = req.params['userId']
    const postId = req.params['id']
    const reqBody = req.body
    if (!userId ||!postId || !reqBody.title || !reqBody.content || !reqBody.summary ) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.updateBlog(userId, postId, reqBody.title, reqBody.content, reqBody.summary)
    res.status(response.code).send(response.message)
}

const deleteBlog = async(req, res) => {
    const blogId = req.params['id']
    const response = await service.deleteBlog(blogId)
    res.status(response.code).send(response.message)
}

const addComment = async(req, res) => {
    const userId = req.params['userId']
    const postId = req.params['id']
    if (!userId ||!postId || !req.body.comment) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.addComment(userId, postId, req.body.comment)
    res.status(response.code).send(response.message)
}

module.exports = {
    getAllBlogs,
    myBlogs,
    updateBlog,
    getBlog,
    createBlog,
    deleteBlog,
    addComment
}