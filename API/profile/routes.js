//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const { profileCreate } = require("./controllers");

const router = express.Router();

/* Middleware that handles fetching */
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const error = new Error("trip Not Found");
    error.status = 404;
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

/* Read Routes */
//Create profile
router.post(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileCreate
);

module.exports = router;
