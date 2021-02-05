const express = require("express");
const router = express.Router();
const contollers = require("../controllers");

// '/users/': returns all users
router.post("​/upload-profile-pic", controllers.uploadProfilePic);

module.exports = router;
