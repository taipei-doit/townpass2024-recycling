var express = require("express");
var router = express.Router();

var authRouter = require("./auth");
var testRouter = require("./test");
var chatRouter = require("./chat");

router.use("/auth", authRouter);
router.use("/test", testRouter);
router.use("/chat", chatRouter);

module.exports = router;