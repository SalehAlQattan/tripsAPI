// library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
// components
const { signup, signin, fetchProfile, updateProfile } = require("./controllers");

const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  const profile = await fetchProfile(userId, next)
  if (profile) {
    req.profile = profile;
    next()
  } else {
    const error = new Error("Profile Not Found");
    error.status = 404;
    next(error)
  }
})

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  }
})
const upload = multer({ storage })


// signup route
router.post("/signup", signup);

// signin route
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.put("/profiles/:userId", passport.authenticate("jwt", { session: false }), upload.single("image"), updateProfile);

module.exports = router;
