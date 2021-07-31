//library imports
const express = require("express");
const multer = require("multer");

const passport = require("passport");
//components
const { tripFetch, fetchTrip, deleteTrip } = require("./controllers");

const router = express.Router();

/* Middleware that handles fetching */
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next)
  if (trip) {
    req.trip = trip;
    next()
  } else {
    const error = new Error("trip Not Found");
    error.status = 404;
    next(error)
  }
})

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

/* Read Routes */
router.get("/", tripFetch);

/* Delete Routes */
router.delete("/:tripId", passport.authenticate("jwt", { session: false }), deleteTrip);

module.exports = router;