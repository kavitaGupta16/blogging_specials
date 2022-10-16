const express = require("express")
const { createBlog, getBlog, getAllBlogs, deleteBlog, updateBlog, myBlogs, addComment } = require("../components/blog/blog.controller")
const router = express.Router()

router.route('/getAll').get((req, res) => getAllBlogs(req, res))
router.route('/my/:id').get((req, res) => myBlogs(req, res))
router.route('/getBlog/:id').get((req, res) => getBlog(req, res))
router.route('/create/:id').post((req, res) => createBlog(req, res))
router.route('/update/:userId/:id').patch((req, res) => updateBlog(req, res))
router.route('/addComment/:userId/:id').post((req, res) => addComment(req, res))
router.route('/delete/:id').delete((req, res) => deleteBlog(req, res))

module.exports = router