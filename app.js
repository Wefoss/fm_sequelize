const express = require('express')
const router = require('./routes')

const app = express()
app.use(express.json())
app.use('/api', router)


app.use((err,req,res,next) => {
   const statusError = err.status || 500
   res.status(statusError).send({
      error: [{message: err || 'Internal Server Error'}]
   })
})

module.exports = app