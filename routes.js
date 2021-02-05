const express = require("express");
const path = require("path");

const router = express.Router();
const controllers = require("./controllers");

router.post("/upload-profile-pic", controllers.uploadProfilePic);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = router;
