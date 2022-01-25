const { configs } = require("../config");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const getPosts = asyncHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
	});
});

module.exports = {
	getPosts,
};
