const runQuery = require("./db.js");
const buildResponse = require("./utils/response.js");

const getAllSQL = `SELECT * FROM pictures`;

const pictureController = {
  uploadPicsAfter: async (req, res) => {
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

    if (req.file)
      response = `<div>You have uploaded this picture:</div> <img src=${req.file.filename} />`;

    if (req.files)
      response = `<div>You have uploaded these pictures:</div> ${req.files.map(
        (file) => {
          return `<img src="${file.filename}" />`;
        }
      )}`;

    res.send(response);
  },
};

module.exports = pictureController;
