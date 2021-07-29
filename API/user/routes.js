// packages
const express = require('express');
const passport = require('passport');
// importing controllers
const { signup, signin } = require('./controllers');
// routes
const router = express.Router();

// signup route
router.post('/signup', signup);

// signin route
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signin
);

// exporting the route
module.exports = router;
