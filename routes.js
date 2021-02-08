const express = require("express");
const path = require("path");
const upload = require("./utils/multer");

const router = express.Router();
const controllers = require("./controllers");

router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  controllers.uploadProfilePicAfter
);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = router;
