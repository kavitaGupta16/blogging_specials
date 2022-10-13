const logger = require('../../utils/logging')
const userModel = require("./user.model")

const login = async(userName, password) => {
    try {
        const user = await userModel.findOne({ userName }, { password: 1 })
        if (!user)
            return({code: 401, message: "User not found"})
        const isMatch = await user.matchPasswords(password)
        if (!isMatch)
            return({code: 401, message: "Password is incorrect"})
        return ({code: 200, message: JSON.stringify({token: user.getSignedToken()})})
    } catch (error) {
        logger.error("USER-SERVICE", "Error while login", error)
    }
}

const forgotPassword = async(userName) => { }
const resetPassword = async(token) => { }
const register = async() => { }
const activate = async(token) => { }
const update = async() => { }
const deleteUser = async(id) => { }

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    register,
    activate,
    update,
    deleteUser
}