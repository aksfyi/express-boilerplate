const crypto = require("crypto");

const getID = () => crypto.randomBytes(15).toString("hex");

module.exports = {
	getID,
};
