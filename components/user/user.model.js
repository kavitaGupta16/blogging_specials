const { default: mongoose } = require("mongoose")

const savedPostsSchema = new mongoose.Schema({
    id: {
        type: String
    }
})

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter username"],
        trim: true,
        unique: [true, 'Username is unavailable']
    },
    profilePicture: {
        data: Buffer,
        contentType: String
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
    },
    postInfo: {
        type:{
            totalPosts: {
                type: Number,
                default: 0
            },
            draftPosts: {
                type: Number,
                default: 0
            },
            archivedPosts: {
                type: Number,
                default: 0
            }
        }
    },
    savedPosts: {
        type: [savedPostsSchema]
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    activationToken: String,
    activationTokenExpire: Date, 
}, {
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)
