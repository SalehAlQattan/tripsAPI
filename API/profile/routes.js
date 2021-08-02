//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const { profileFetch } = require("./controllers");

const router = express.Router();

/* Middleware that handles fetching */

/* Read Routes */
//Create profile
router.get("/", profileFetch);

module.exports = router;