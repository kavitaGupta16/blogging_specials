const express = require("express")
const router = express.Router()

router.use('/blog', require('./blog'))
router.use('/user', require('./user'))

module.exports = router