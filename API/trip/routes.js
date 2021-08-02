//library imports
const express = require('express');
const multer = require('multer');
const passport = require('passport');
//components
const {
  tripFetch,
  fetchTrip,
  deleteTrip,
  tripCreate,
  updateTrip,
} = require('./controllers');

const router = express.Router();

/* Middleware that handles fetching */
router.param('tripId', async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.foundTrip = trip;
    next();
  } else {
    const error = new Error('Trip Not Found');
    error.status = 404;
    next(error);
  }
});

// Don't you think you can clean the routes file and move all multer things to the middlware folder?
const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });
/* Read Routes */

//Get trip
router.get('/', tripFetch);

//Create trip
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  tripCreate
);

/* Delete Routes */
router.delete(
  '/:tripId',
  passport.authenticate('jwt', { session: false }),
  deleteTrip
);

// update route
router.put(
  '/:tripId',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  updateTrip
);

module.exports = router;
