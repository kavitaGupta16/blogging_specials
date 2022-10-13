const express = require("express")
const { login, forgotPassword, resetPassword, register, activate, update, deleteUser } = require("../components/user/user.controller")
const router = express.Router()

router.route('/login').post((req, res) => login(req, res))
router.route('/forgotPassword').post((req, res) =>  forgotPassword(req, res))
router.route('/resetPassword/:resetToken').put((req, res) =>  resetPassword(req, res))
router.route('/register').post((req, res) =>  register(req, res))
router.route('/activate/:activationToken').get((req, res) =>  activate(req, res))
router.route('/update').patch((req, res) =>  update(req, res))
router.route('/delete/:id').delete((req, res) => deleteUser(req, res))

module.exports = router