const express = require("express")
const { createBlog, getAllBlogs } = require("../components/blog/blog.controller")
const router = express.Router()

router.route('/getAll').get((req, res) => getAllBlogs(req, res))

router.route('/create').post((req, res) => createBlog(req, res))

module.exports = router