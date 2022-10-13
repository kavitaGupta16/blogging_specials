const NAMESPACE = "CONNECTION"
const { default: mongoose } = require("mongoose")
const { info, error } = require("../utils/logging")
const { DB_URL } = require("./hotKeys")

const connectDb = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(info(NAMESPACE, "Database connected successfully!"))
    .catch(err => error(NAMESPACE, err.msg, err))
}

module.exports = {
    connectDb
}
