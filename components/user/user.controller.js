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

const forgotPassword = async(req, res) => {
    const reqBody = req.body
    if (!reqBody.userName) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.forgotPassword(reqBody.userName)
    res.status(response.code).send(response.message)
}

const resetPassword = async(req, res) => {
    const token = req.params['resetToken']
    if (!token ) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.resetPassword(token)
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

const activate = async(req, res) => {
    const token = req.params['activationToken']
    if (!token ) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.activate(token)
    res.status(response.code).send(response.message)
}

const update = async(req, res) => {
    const response = await service.update()
    res.status(response.code).send(response.message)
}

const deleteUser = async(req, res) => {
    const id = req.params['id']
    if (!id ) {
        res.status(206).json({message: "Missing one or more detail(s)"})
        return
    }
    const response = await service.deleteUser(id)
    res.status(response.code).send(response.message)
}

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    register,
    activate,
    update,
    deleteUser
}
