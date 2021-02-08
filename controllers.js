const profileController = {
  uploadProfilePicAfter: (req, res) => {
    if (req.badExtension)
      return res.status(400).send("File extension not allowed");

    if (!req.file)
      return res.status(400).send("Select a file before uploading");

    const response = `<div>You have uploaded this picture:</div> <img src=${req.file.filename} />`;
    res.send(response);
  },
};

module.exports = profileController;
