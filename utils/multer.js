const { UPLOADS } = process.env;

const path = require("path");
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

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFiletypes = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

    if (!allowedFiletypes.includes(path.extname(file.originalname))) {
      req.badExtension = true;
      return cb(null, false);
    } else cb(null, true);
  },
});

module.exports = upload;
