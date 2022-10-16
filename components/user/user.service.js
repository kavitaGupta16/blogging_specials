const userModel = require("./user.model")
const { error } = require("../../utils/logging")
const { getHashedPassword, matchPasswords, getSignedToken } = require("./user.util")
const { findByIdAndUpdate } = require("./user.model")

const login = async(userName, password, remember=false) => {
    try {
        const user = await userModel.findOne({ userName }, { password: 1 })
        if (!user)
            return({code: 401, message: "User not found"})
        const isMatch = await matchPasswords(user.password, password)
        if (!isMatch)
            return({code: 401, message: "Password is incorrect"})
        return ({code: 200, message: JSON.stringify({token: user._id, success: true})})
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
        else
            return({code: 200, message: "Found"})
        
    } catch (err) {}
}

const resetPassword = async(userName, password) => { 
    try {
        const hashedPassword = await getHashedPassword(password)
        await userModel.findOneAndUpdate({ userName }, { password: hashedPassword })
        return({code: 200, message: "Updated"})
        
    } catch (err) {}
}

const register = async(userName, name, email, password) => {
    try {
        const hashedPassword = await getHashedPassword(password)
        let userInfo = {
            userName,
            name,
            email,
            password: hashedPassword
        }
        await userModel.create(userInfo)
        return({code: 201, message: "User created"})
    } catch (err) {
        if (err.name === 'MongoServerError') {
            if (err.code === 11000) {
                const param = Object.keys(err.keyValue)[0]
                if (param === 'userName') {
                    return { code: 400, message: "Username is not available!" }
                } else if (param === 'email') {
                    return { code: 400, message: "Email address is already registered"}}
            }
        }
        error("USER-SERVICE", "Error while registering user", err)
        return({code: 500, message: "Error while registering user"})
    }
}

const userDetails = async(id) => {
    const userDetails = await userModel.findById(id, {_id: 0,userName: 1, name: 1, email: 1})
    if (!userDetails)
        return({code: 401, message: "User not found"})
    return({code: 200, message: JSON.stringify(userDetails)})
}

const update = async(id, userName, name, email, password=false) => {
    if (!password) {
        await userModel.findByIdAndUpdate(id, {userName, name, email})
    } else {
        const hashedPassword = await getHashedPassword(password)
        await userModel.findByIdAndUpdate(id, {userName, name, email, password: hashedPassword})
    }
    return({code: 200, message: "Updated"})

}

const deleteUser = async(id) => { 
    try {
        await userModel.findByIdAndDelete(id)
        return({code: 200, message: "Deleted"})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    register,
    userDetails,
    update,
    deleteUser
}