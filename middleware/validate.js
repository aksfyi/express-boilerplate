const Joi = require("joi");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");

// Example validation middleware

const postSchema = Joi.object({
	title: Joi.string().max(100).required(),
	description: Joi.string().max(300),
	isPublic: Joi.boolean().required(),
});

const validate = (route) => {
	switch (route) {
		case "getPost":
			return asyncHandler((req, res, next) => {
				req.log.info("validate: Validating getPost request");
				const valid = postSchema.validate(req.query);
				if (valid.error) {
					next(new ErrorResponse(valid.error, 400));
				}
				next();
			});
		default:
			return asyncHandler((req, res, next) => {
				req.log.warn(`validate: Invalid route : ${route}`);
				next();
			});
	}
};

module.exports = validate;
