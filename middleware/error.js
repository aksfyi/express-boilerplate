const ErrorResponse = require("../utils/errorResponse");

// Express error handler middleware
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	// Handle Mongoose errors

	// Bad Object ID (Mongoose)
	if (err.name === "CastError") {
		const message = "Resource not found in the database";
		error = new ErrorResponse(message, 404);
	}

	// If unique constraint is violated
	if (err.code === 11000) {
		const message = "Duplicate Field value entered";
		error = new ErrorResponse(message, 400);
	}

	// Error when validating the db values
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "JsonWebTokenError") {
		const message = "Token error";
		error = new ErrorResponse(message, 403);
	}

	if (err.name === "TokenExpiredError") {
		const message = "Token expired";
		error = new ErrorResponse(message, 403);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Internal Server Error ",
	});
};

module.exports = errorHandler;
