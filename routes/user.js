const express = require("express")
const { login, forgotPassword, register, update, deleteUser, getUserDetails, resetPassword } = require("../components/user/user.controller")
const router = express.Router()

router.route('/login').post((req, res) => login(req, res))
router.route('/register').post((req, res) =>  register(req, res))
router.route('/forgotPassword/:userName').get((req, res) =>  forgotPassword(req, res))
router.route('/resetPassword/:userName').post((req, res) => resetPassword(req, res))
router.route('/getUserDetails/:id').get((req, res) => getUserDetails(req, res))
router.route('/update/:id').patch((req, res) => update(req, res))
router.route('/delete/:id').delete((req, res) => deleteUser(req, res))


module.exports = router