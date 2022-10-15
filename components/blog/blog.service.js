const blogModel = require("./blog.model")

const getAllBlog = async() => {
    try {
        const blogs = await blogModel.find({})
        return {code: 200, message: JSON.stringify(blogs)}
    } catch (err) {}
}

const createBlog = async(by, title, body, blogStatus, headerImage='') => {
    try {
        await blogModel.create({
            owner: by,
            title,
            headerImage,
            body,
            status: blogStatus
        })
        return { code: 201, message: "Blog created" }
    } catch (err) {
    }
}

module.exports = {
    getAllBlog,
    createBlog
}