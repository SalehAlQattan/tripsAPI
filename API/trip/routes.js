//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const { tripFetch, tripCreate } = require("./controllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });
/* Read Routes */

//Get trip
router.get("/", tripFetch);

//Create trip
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

module.exports = router;
