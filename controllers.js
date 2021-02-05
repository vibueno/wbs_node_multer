const upload = require("./multer");

const profileController = {
  uploadProfilePic: (req, res) => {
    upload.single("profile_pic")(req, res, () => {
      res.send("Your file has been uploaded");
    });
  },
};

module.exports = profileController;
