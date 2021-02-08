const pictureController = {
  uploadPicsAfter: (req, res) => {
    let response;

    if (req.badExtension)
      return res.status(400).send("File extension not allowed");

    if (!req.file && !req.files)
      return res.status(400).send("Select a file before uploading");

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
