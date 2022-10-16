const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const { JWT_SECRET, JWT_EXPIRE_PERM, JWT_EXPIRE_TEMP } = require('../../config/hotKeys')

const getHashedPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return password
}

const matchPasswords = async(hashedPassword, password) => {
    return await bcrypt.compare(password, hashedPassword)
}

const getSignedToken = (id, remember) => {
    return jwt.sign({ id }, JWT_SECRET,
        { expiresIn: remember ? JWT_EXPIRE_PERM : JWT_EXPIRE_TEMP })
}

module.exports = {
    getHashedPassword,
    matchPasswords,
    getSignedToken
}