const jwt = require("jsonwebtoken");
const { configs } = require("../config");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");

const verifyAuth = asyncHandler((req, res, next) => {
	// Get the authorization header
	const authorizationHeader = req.headers["authorization"];

	// If the token is not sent in authorization header send error
	// response
	if (!authorizationHeader) {
		next(new ErrorResponse("Token in the authorization header missing", 403));
	} else if (!authorizationHeader.startsWith("Bearer ")) {
		// If the header doesnt start with "Bearer " send error response
		// "Bearer" is recommended but not mandatory (RFC)
		next(
			new ErrorResponse(
				"Format error . Please send the token as Bearer token",
				403
			)
		);
	} else {
		// Get the token from header
		token = authorizationHeader.substring(7, authorizationHeader.length);
		const decoded = jwt.verify(token, configs.JWT_KEY);
		// Optional Field check
		// if (decoded.isDeactivated) {
		// 	next(new ErrorResponse("Account Deactivated", 403));
		// }
		// if (!decoded.isEmailConfirmed) {
		// 	next(new ErrorResponse("Email not confirmed", 403));
		// }
		req.user = decoded;
		next();
	}
});

module.exports = verifyAuth;
