const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') })

if (!process.env.PORT || !process.env.HOST || !process.env.DB_URL)
    throw "Configuration Error"
const PORT = process.env.PORT
const HOST = process.env.HOST
const DB_URL = process.env.DB_URL

module.exports = {
    PORT,
    HOST,
    DB_URL
}
