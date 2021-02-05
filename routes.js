const express = require("express");
const path = require("path");

const router = express.Router();
const controllers = require("./controllers");

const { UPLOADS } = process.env;

//Multer config

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  controllers.uploadProfilePic
);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = router;
