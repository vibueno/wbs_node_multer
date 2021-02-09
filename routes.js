const express = require("express");
const upload = require("./utils/multer");

const router = express.Router();
const controllers = require("./controllers");

router.get("/get-pics", controllers.getAllPics);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  controllers.uploadPicsAfter
);

router.post(
  "/upload-cat-pics",
  upload.array("cat_pics"),
  controllers.uploadPicsAfter
);

module.exports = router;
