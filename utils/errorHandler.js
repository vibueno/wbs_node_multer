const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let message = "";
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File exceeds max size";
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      message = "Too many files";
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "File type not allowed";
    }
    return res.status(400).json({
      ok: false,
      message: message.length ? message : err.message,
    });
  }

  res.status(500).send("Server error!");
};

module.exports = errorHandler;
