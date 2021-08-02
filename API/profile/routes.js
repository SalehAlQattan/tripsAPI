//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const { profileFetch } = require("./controllers");

const router = express.Router();

/* Middleware that handles fetching */

/* Read Routes */
router.get("/", profileFetch);

/* Todo: Update Profile */

module.exports = router;