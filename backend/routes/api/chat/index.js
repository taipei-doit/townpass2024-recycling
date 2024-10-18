var express = require("express");
var router = express.Router();

var photoRouter = require("./photo");
var textRouter = require("./text");

router.use("/photo", photoRouter);
router.use("/text", textRouter);

module.exports = router;