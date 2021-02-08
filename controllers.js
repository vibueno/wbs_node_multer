const runQuery = require("./db.js");

const pictureController = {
  uploadPicsAfter: async (req, res) => {
    const insertPictureSQL =
      "INSERT INTO pictures (name, originalname) VALUES ";
    let response;

    if (req.badExtension)
      return res
        .status(400)
        .send(
          "One of the files you tried to upload has an extension that is not allowed. All other files have been uploaded."
        );

    if (req.files) {
      if (!req.files.length) {
        return res
          .status(400)
          .send("Select one or more files before uploading.");
      }
    } else if (!req.file)
      return res.status(400).send("Select a file before uploading.");

    if (req.file) {
      const querySQL = insertPictureSQL + "($1,$2);";

      const query = {
        text: querySQL,
        values: [req.file.filename, req.file.originalname],
      };

      const data = await db.query(query);
      response = `<div>You have uploaded this picture:</div> <img src=${req.file.filename} />`;
    }

    if (req.files) {
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
    }
    return res.status(200).send(response);
  },
};

module.exports = pictureController;
