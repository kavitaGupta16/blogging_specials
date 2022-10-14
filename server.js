const express = require('express')
const bodyParser = require('body-parser')

const logging = require('./utils/logging.js')
const { connectDb } = require('./config/connectDb.js')
const { PORT, HOST } = require('./config/hotKeys.js')
const NAMESPACE = "SERVER"
const app = express()
connectDb()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
            'GET POST DELETE')
        return res.status(200).json({})
    }
    next()
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build/'))
    app.get('*', (req, res) => {
        res.sendFile(require('path').resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use('/api', require("./routes"))

const server = app.listen(PORT, () => logging.info(NAMESPACE, `Server is running ${HOST}:${PORT}`))

process.on('unhandledRejection', (err) => {
    logging.error(NAMESPACE, 'Server Error' + err.msg, err)
    server.close(() => process.exit(1))
})
