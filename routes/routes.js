const express = require("express");
const path = require("path");
const upload = require("../utils/multer");

const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/get-pics", controllers.getAllPics);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  controllers.uploadProfilePicAfter
);

router.post(
  "/upload-cat-pics",
  upload.array("cat_pics"),
  controllers.uploadCatPicsAfter
);

module.exports = router;
