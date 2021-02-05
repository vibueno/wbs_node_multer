const profileController = {
  uploadProfilePicAfter: (req, res) => {
    if (!req.file)
      return res.status(400).send("Select a file before uploading");
    else res.send("Your file has been uploaded");
  },
};

module.exports = profileController;
