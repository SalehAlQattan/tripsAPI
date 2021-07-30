// library imports
const express = require("express");
const passport = require("passport");
// components
const { signup, signin } = require("./controllers");

const router = express.Router();

// signup route
router.post("/signup", signup);

// signin route
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
