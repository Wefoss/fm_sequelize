const express = require('express')
const router = require('./router')

const app = express()
app.use(express.json())
app.use('/api', router)
app.use((err, req,res,next) => {
   res.status(500).send({
      error: [{message: err.message}]
   })
})

module.exports = app