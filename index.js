// Dotenv config

const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;

// Express config

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/", routes);

//Start server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
