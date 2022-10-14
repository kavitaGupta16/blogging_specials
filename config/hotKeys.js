const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') })

if (!process.env.PORT || !process.env.HOST || !process.env.DB_URL || !process.env.JWT_SECRET || !process.env.JWT_EXPIRE_TEMP || !process.env.JWT_EXPIRE_PERM)
    throw "Configuration Error"
const PORT = process.env.PORT
const HOST = process.env.HOST
const DB_URL = process.env.DB_URL
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE_TEMP = process.env.JWT_EXPIRE_TEMP
const JWT_EXPIRE_PERM = process.env.JWT_EXPIRE_PERM

module.exports = {
    PORT,
    HOST,
    DB_URL,
    JWT_SECRET, 
    JWT_EXPIRE_TEMP,
    JWT_EXPIRE_PERM
}
