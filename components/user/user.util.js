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

const getResetPasswordToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const resetPasswordExpire = new Date(Date.now() + (15 * 60 * 1000))
    return [resetPasswordToken, resetPasswordExpire]
}

const getActivationToken = () => {
    let activationToken = crypto.randomBytes(20).toString('hex')
        activationToken = crypto.createHash('sha256').update(activationToken).digest('hex')
    const activationExpire = new Date(Date.now() + 2 * (60 * 60 * 1000))
    return [activationToken, activationExpire]

}


module.exports = {
    getHashedPassword,
    matchPasswords,
    getSignedToken,
    getResetPasswordToken,
    getActivationToken
}