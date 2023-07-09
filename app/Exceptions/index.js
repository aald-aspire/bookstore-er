const BookStoreError = require('./bserror')

const errorHandler = (err, req, res, next) => {
	var status = 500

	if(err instanceof BookStoreError)
		status = err.status

	res.status(status).json({
		msg: err.message,
		success: false
	})
}

module.exports = {
	errorHandler
}