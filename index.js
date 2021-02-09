// Dotenv config

const dotenv = require("dotenv");

dotenv.config();
const { PORT } = process.env;

const errorHandler = require("./utils/errorHandler");

// Express config

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes");
app.use("/", routes);

app.use(express.static("uploads"));

app.use(errorHandler);

//Start server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
