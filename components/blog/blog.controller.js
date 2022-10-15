const service = require("./blog.service")

const getAllBlogs = async(req, res) => {
    const response = await service.getAllBlog()
    res.status(response.code).send(response.message)
}

const createBlog = async(req, res) => {
    const reqBody = req.body
    if (!reqBody.id || !reqBody.title || !reqBody.body) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.createBlog(reqBody.by, reqBody.title, reqBody.body, "archive")
    res.status(response.code).send(response.message)
}


module.exports = {
    getAllBlogs,
    createBlog
}