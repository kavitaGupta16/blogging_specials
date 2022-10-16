const service = require("./user.service")

const login = async(req, res) => {
    const reqBody = req.body
    if (!reqBody.userName || !reqBody.password) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.login(reqBody.userName, reqBody.password, reqBody.remember)
    res.status(response.code).send(response.message)
}

const register = async(req, res) => {
    const reqBody = req.body
    if (!reqBody.userName || !reqBody.name && reqBody.name.split(" ").length !== 2 || !reqBody.email || !reqBody.password) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.register(reqBody.userName, reqBody.name, reqBody.email, reqBody.password)
    res.status(response.code).send(response.message)
}

const forgotPassword = async(req, res) => {
    const reqBody = req.params['userName']
    if (!reqBody) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.forgotPassword(reqBody)
    res.status(response.code).send(response.message)
}

const resetPassword = async(req, res) => {
    const userName = req.params['userName']
    const password = req.body.password
    if (!userName || !password) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.resetPassword(userName, password)
    res.status(response.code).send(response.message)
}

const update = async(req, res) => {
    const reqBody = req.body
    console.log(reqBody)
    if (!reqBody.userName || !reqBody.name || !reqBody.email) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    if (reqBody.name.split(" ").length !== 2) {
        res.status(206).json({ message: "Name should contain first and last name"})
    }
    let response
    if (reqBody.password === '') {
        response = await service.update(req.params['id'], reqBody.userName, reqBody.name, reqBody.email)
    } else {
        response = await service.update(req.params['id'], reqBody.userName, reqBody.name, reqBody.email, reqBody.password)
    }
    res.status(response.code).send(response.message)
}

const getUserDetails = async(req, res) => {
    const response = await service.userDetails(req.params['id'])
    res.status(response.code).send(response.message)
}

const deleteUser = async(req, res) => {
    const response = await service.deleteUser(req.params['id'])
    res.status(response.code).send(response.message)
}

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    register,
    update,
    deleteUser,
    getUserDetails
}
