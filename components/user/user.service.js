const userModel = require("./user.model")
const { error } = require("../../utils/logging")
const { getActivationToken, getHashedPassword, matchPasswords, getSignedToken } = require("./user.util")

const login = async(userName, password, remember=false) => {
    try {
        const user = await userModel.findOne({ userName }, { password: 1 })
        if (!user)
            return({code: 401, message: "User not found"})
        const isMatch = await matchPasswords(user.password, password)
        if (!isMatch)
            return({code: 401, message: "Password is incorrect"})
        const token = getSignedToken(user._id, remember)
        return ({code: 200, message: JSON.stringify({token, success: true})})
    } catch (err) {
        error("USER-SERVICE", "Error while login", err)
        return({code: 500, message: "Error while login"})
    }
}

const forgotPassword = async(userName) => { 
    try {
        const user = await userModel.findOne({ userName })
        if (!user)
            return({code: 401, message: "User not found"})
        user.getRestPasswordToken()
        console.log(user)
        
    } catch (err) {
        error("USER-SERVICE", "Error while generating reset token", err)
        return({code: 500, message: "Error while generating reset token"})
        
    }
}
const resetPassword = async(token) => { }

const register = async(userName, name, email, password) => {
    try {
        const hashedPassword = await getHashedPassword(password)
        const [activationToken, activationTokenExpire] = getActivationToken()
        let userInfo = {
            userName,
            name,
            email,
            password: hashedPassword,
            activationToken,
            activationTokenExpire
            
        }
        await userModel.create(userInfo)
        return({code: 201, message: "User created"})
    } catch (err) {
        error("USER-SERVICE", "Error while registering user", err)
        return({code: 500, message: "Error while registering user"})
    }
}
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