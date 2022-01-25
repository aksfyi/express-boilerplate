// Custom error class to add status code to the error
class ErrorResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;

		// constructor is ignored in stacktrace
		// (https://stackoverflow.com/questions/59625425/understanding-error-capturestacktrace-and-stack-trace-persistance)
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ErrorResponse;
