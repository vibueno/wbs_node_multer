const db = require("../utils/db.js");
const format = require("pg-format");

const { UPLOADS } = process.env;

const insertPictureSQL = "INSERT INTO pictures (name, originalname) VALUES ";

const pictureController = {
  getAllPics: async (req, res) => {
    let response = "";

    const query = {
      text: "SELECT name FROM pictures",
    };

    const picturesData = await db.query(query);

    picturesData.rows.forEach((picture) => {
      response += `<div><a href="${picture.name}">${picture.name}</a></div>`;
    });
    return res.status(200).send(response);
  },

  uploadProfilePicAfter: async (req, res) => {
    if (!req.file)
      return res.status(400).send("Select a file before uploading.");

    const querySQL = insertPictureSQL + "($1,$2);";

    const query = {
      text: querySQL,
      values: [req.file.filename, req.file.originalname],
    };

    const data = await db.query(query);
    const response = `<div>You have uploaded this picture:</div> <img src=${req.file.filename} />`;

    return res.status(200).send(response);
  },

  uploadCatPicsAfter: async (req, res) => {
    if (req.files)
      if (!req.files.length)
        return res
          .status(400)
          .send("Select one or more files before uploading.");

    let response = "<div>You have uploaded these pictures:</div>";
    const values = [];

    req.files.forEach((file, index) => {
      values.push([file.filename, file.originalname]);
      response += `<img src="${file.filename}" />`;
    });

    const querySQL = format(insertPictureSQL + "%L", values);

    const query = {
      text: querySQL,
    };

    const data = await db.query(query);

    return res.status(200).send(response);
  },
};

module.exports = pictureController;
