const db = require("../utils/db.js");

const { UPLOADS } = process.env;

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
    const insertPictureSQL =
      "INSERT INTO pictures (name, originalname) VALUES ";
    let response;

    if (!req.file)
      return res.status(400).send("Select a file before uploading.");

    const querySQL = insertPictureSQL + "($1,$2);";

    const query = {
      text: querySQL,
      values: [req.file.filename, req.file.originalname],
    };

    const data = await db.query(query);
    response = `<div>You have uploaded this picture:</div> <img src=${req.file.filename} />`;

    return res.status(200).send(response);
  },

  uploadCatPicsAfter: async (req, res) => {
    const insertPictureSQL =
      "INSERT INTO pictures (name, originalname) VALUES ";
    let response;

    if (req.files)
      if (!req.files.length)
        return res
          .status(400)
          .send("Select one or more files before uploading.");

    response = "<div>You have uploaded these pictures:</div>";
    let querySQL = insertPictureSQL;
    let values = [];

    req.files.forEach((file, index) => {
      response += `<img src="${file.filename}" />`;
      querySQL += `(${"$" + (2 * index + 1) + "::text"},${
        "$" + (2 * index + 2) + "::text"
      }),`;
      values.push(file.filename);
      values.push(file.originalname);
    });

    querySQL = querySQL.slice(0, -1);
    querySQL += ";";

    const query = {
      text: querySQL,
      values: values,
    };

    const data = await db.query(query);

    return res.status(200).send(response);
  },
};

module.exports = pictureController;
