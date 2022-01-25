const express = require("express");
const helmet = require("helmet");
const { configs, checkConfigs } = require("./config");
const errorHandler = require("./middleware/error");
const connectDB = require("./model/connect");
const posts = require("./routes/posts");
const pino = require("pino-http")();

const app = express();
app.use(pino);

if (!checkConfigs()) {
	console.log("Please configure required environment variables");
} else {
	connectDB();
	app.use(express.json());

	app.use(helmet());

	app.use("/api/v1/", posts);

	app.use(errorHandler);

	app.listen(
		configs.PORT,
		console.log(
			`Server running in port ${configs.PORT}. ENV : ${configs.ENVIRONMENT}`
		)
	);
}
