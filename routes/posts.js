const express = require("express");
const { getPosts } = require("../controllers/post.controller");
const verifyAuth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.route("/").get(validate("getPosts"), getPosts);

module.exports = router;
