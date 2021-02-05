// Dotenv config

const dotenv = require("dotenv");
dotenv.config();

// Express config

const { PORT } = process.env;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Multer config

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

//Start server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
