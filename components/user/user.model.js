const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter username"],
        trim: true,
        unique: [true, 'Username is unavailable']
    },
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Email invalid'],
        trim: true,
        unique: [true, 'Email Already Exists']
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    }
}, {
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    activationToken: String,
    activationTokenExpire: Date, 
    timestamps: true
})

userSchema.pre('save', async(next) => {
    if(this.isModified('password')) { next() }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.matchPasswords = async(password) => {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken = () => {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE })
}

userSchema.methods.getResetPasswordToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordTaken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = new Date(Date.now() + (15 * 60 * 1000))
}

userSchema.methods.getActivationToken = () => {
    const activationToken = crypto.randomBytes(20).toString('hex')
    this.activationTaken = crypto.createHash('sha256').update(activationToken).digest('hex')
    this.activationExpire = new Date(Date.now() + 2 * (60 * 60 * 1000))
}

module.exports = mongoose.model("User", userSchema)
