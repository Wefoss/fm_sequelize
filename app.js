const express = require('express')
const router = require('./routes')
const errorHandler=  require('./middleware/error.handler.mw')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static('public'))

app.use(errorHandler)

module.exports = app