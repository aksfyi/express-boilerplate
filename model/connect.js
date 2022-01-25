const mongoose = require("mongoose");
const { configs } = require("../config");

const connectDB = async () => {
	let options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	await mongoose.connect(configs.MONGO_URI, options);
	console.log("Connected to MongoDB");
};

module.exports = connectDB;
