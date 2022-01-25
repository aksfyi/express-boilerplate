require("dotenv").config();

const env = {
	development: "DEV",
	production: "PROD",
};

const configs = {
	MONGO_URI: process.env.MONGO_URI,
	ENVIRONMENT: process.env.ENVIRONMENT || env.development,

	JWT_KEY: process.env.JWT_KEY,
	PORT: process.env.PORT || 5000,
};

const checkConfigs = () => {
	if (!configs.MONGO_URI || !configs.JWT_KEY) return false;
	return true;
};

module.exports = {
	checkConfigs,
	configs,
	env,
};
