module.exports = async (err,req,res,next) => {
    const statusError = err.status || 500
    res.status(statusError).send({
       error: [{message: err || 'Internal Server Error'}]
    })
 }

 